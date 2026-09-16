const { Product } = require('../models')
const { nextId } = require('../utils/genId')

// Normalise gallery entries. Accepts either `[{url}]` (new shape) or
// `["url", ...]` (legacy) and returns the canonical object form. Drops
// blanks / placeholder emoji and caps at 12 to keep documents reasonable.
function sanitizeImages(input) {
  if (!Array.isArray(input)) return []
  return input
    .map((entry) => {
      if (typeof entry === 'string') return { url: entry.trim() }
      return { url: String(entry?.url ?? '').trim() }
    })
    .filter((e) => e.url && e.url !== '🥻')
    .slice(0, 12)
}

exports.list = async (_req, res) => {
  res.json(await Product.find().sort({ createdAt: -1 }))
}

exports.getOne = async (req, res) => {
  const product = await Product.findOne({ id: req.params.id })
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json(product)
}

exports.create = async (req, res) => {
  const d = req.body
  const stock = Number(d.stock) || 0
  const name = String(d.name || '').trim()
  const slug = String(d.slug || '').trim().toLowerCase().replace(/\s+/g, '-') || name.toLowerCase().replace(/\s+/g, '-')
  if (slug) {
    const exists = await Product.findOne({ slug })
    if (exists) return res.status(409).json({ message: 'Product slug already exists' })
  }
  // Gallery source of truth: prefer the images array; fall back to the
  // legacy single `image` field if that's all the client sent.
  const images = sanitizeImages(d.images?.length ? d.images : d.image ? [d.image] : [])
  const product = await Product.create({
    ...d,
    id: await nextId(Product, 'SAR-'),
    slug,
    categorySlug: d.categorySlug || d.category || '',
    price: Number(d.price) || 0,
    mrp: Number(d.mrp) || 0,
    stock,
    sold: 0,
    rating: 0,
    images,
    image: images[0]?.url || '🥻',
    status: stock > 0 ? d.status || 'active' : 'out_of_stock',
  })
  res.status(201).json(product)
}

exports.bulkCreate = async (req, res) => {
  const items = (req.body.items || []).filter((d) => d && String(d.name || '').trim())
  if (!items.length) return res.json([])

  const docs = await Product.find({}, 'id').lean()
  let max = docs
    .map((d) => parseInt(String(d.id).replace(/\D/g, ''), 10))
    .filter((n) => !Number.isNaN(n))
    .reduce((a, b) => Math.max(a, b), 0)

  const toAdd = items.map((d) => {
    max += 1
    const stock = Number(d.stock) || 0
    const name = String(d.name).trim()
    const slug = String(d.slug || '').trim().toLowerCase().replace(/\s+/g, '-') || `${name.toLowerCase().replace(/\s+/g, '-')}-${max}`
    return {
      ...d,
      id: `SAR-${max}`,
      slug,
      name,
      categorySlug: d.categorySlug || d.category || '',
      price: Number(d.price) || 0,
      mrp: Number(d.mrp) || 0,
      stock,
      sold: 0,
      rating: 0,
      image: d.image || '🥻',
      status: stock > 0 ? 'active' : 'out_of_stock',
    }
  })
  res.status(201).json(await Product.insertMany(toAdd))
}

exports.update = async (req, res) => {
  const d = { ...req.body }
  delete d.id
  if (d.price !== undefined) d.price = Number(d.price)
  if (d.mrp !== undefined) d.mrp = Number(d.mrp)
  if (d.stock !== undefined) {
    d.stock = Number(d.stock)
    if (d.stock === 0) d.status = 'out_of_stock'
  }
  if (d.images !== undefined) {
    d.images = sanitizeImages(d.images)
    // Keep the legacy single hero pointing at the gallery's first slot so
    // list views (product cards, etc.) that still read `image` stay in sync.
    d.image = d.images[0]?.url || '🥻'
  }
  const product = await Product.findOneAndUpdate({ id: req.params.id }, d, { new: true })
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json(product)
}

exports.restock = async (req, res) => {
  const qty = Number(req.body.qty) || 0
  const product = await Product.findOne({ id: req.params.id })
  if (!product) return res.status(404).json({ message: 'Product not found' })
  product.stock += qty
  if (product.stock > 0 && product.status === 'out_of_stock') product.status = 'active'
  await product.save()
  res.json(product)
}

exports.remove = async (req, res) => {
  await Product.findOneAndDelete({ id: req.params.id })
  res.json({ ok: true })
}

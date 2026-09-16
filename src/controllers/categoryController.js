const { Category } = require('../models')

exports.list = async (_req, res) => {
  res.json(await Category.find().sort({ sortOrder: 1, createdAt: 1 }))
}

exports.create = async (req, res) => {
  const name = String(req.body.name || '').trim()
  if (!name) return res.status(400).json({ message: 'Category name is required' })
  const id = name.toLowerCase().replace(/\s+/g, '-')
  const slug = String(req.body.slug || '').trim().toLowerCase().replace(/\s+/g, '-') || id

  const exists = await Category.findOne({ $or: [{ id }, { slug }] })
  if (exists) return res.status(409).json({ message: 'Category already exists' })

  const category = await Category.create({
    id,
    slug,
    name,
    blurb: req.body.blurb || '',
    image: req.body.image || '',
    sortOrder: Number(req.body.sortOrder) || 0,
    active: req.body.active !== undefined ? !!req.body.active : true,
  })
  res.status(201).json(category)
}

exports.update = async (req, res) => {
  const d = { ...req.body }
  delete d.id
  const category = await Category.findOneAndUpdate({ id: req.params.id }, d, { new: true })
  if (!category) return res.status(404).json({ message: 'Category not found' })
  res.json(category)
}

exports.remove = async (req, res) => {
  await Category.findOneAndDelete({ id: req.params.id })
  res.json({ ok: true })
}

import mongoose from "mongoose";

export const productMediaSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    url:{
        type:String,
        required:true
    },
    publicId:{
        type:String,
     required:true
    },
      sortOrder: {
        type: Number,
        default: 0
    },

    isPrimary: {
        type: Boolean,
        default: false
    }

},
{
    timestamps: true
});
productMediaSchema.index(
    {product:1,sortOrder:1}
,{unique:true}
)

export default mongoose.models.ProductMedia || mongoose.model("ProductMedia",productMediaSchema)
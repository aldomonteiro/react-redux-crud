import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  description: { type: String, unique: true },
});

/*The category model will now have createdAt and updatedAt properties, 
which get automatically generated and updated when you save your document.*/
categorySchema.plugin(timestamps);

export default mongoose.model('category', categorySchema);

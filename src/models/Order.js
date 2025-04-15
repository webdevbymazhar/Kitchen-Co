import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [
    {
      dishId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Dish' },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1, required: true },
    },
  ],
  orderTime: { type: Date, required: true },
  tableNumber: { type: Number, required: true },
  serverName: { type: String, required: true },
  notes: { type: String, default: "" },
  OrderStatus: {
    type: String,
    enum: ["pending", "confirmed", "canceled"],
    default: "pending",
  }, 
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;

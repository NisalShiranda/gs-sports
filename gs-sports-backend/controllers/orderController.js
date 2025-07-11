import Order from '../Models/order.js';
import Product from '../Models/product.js';

export async function createOrder(req, res) {
    if (req.user == null) {
      res.status(403).json({
        message: "You Need to Login First"
      });
      return;
    }
  
    const body = req.body;
  
    const orderData = {
      orderID: "",
      email: req.user.email,
      name: body.name,
      address: body.address,
      phoneNumber: body.phoneNumber,
      billItems: [],
      total: 0
    };
  
    Order.find().sort({ date: -1 }).limit(1).then(async (lastBills) => {
      if (lastBills.length == 0) {
        orderData.orderID = "ORD0001";
      } else {
        const lastBill = lastBills[0];
        const lastOrderID = lastBill.orderID;
        const lastOrderNumber = lastOrderID.replace("ORD", "");
        const newOrderNumberStr = (parseInt(lastOrderNumber) + 1).toString().padStart(4, '0');
        orderData.orderID = "ORD" + newOrderNumberStr;
      }
  
      for (let i = 0; i < body.billItems.length; i++) {
        const item = body.billItems[i];
        const product = await Product.findOne({ productID: item.productID });
  
        if (product == null) {
          res.status(404).json({
            message: "Product with ID " + item.productID + " Not Found"
          });
          return;
        }
  
        orderData.billItems[i] = {
          productID: product.productID,
          productName: product.name,
          image: product.images[0],
          quantity: item.quantity,
          price: product.price,
          selectedColor: item.selectedColor || null, // ✅ Added
          selectedSize: item.selectedSize || null    // ✅ Added
        };
  
        orderData.total += product.price * item.quantity;
      }
  
      const order = new Order(orderData);
      console.log(order);
  
      order.save().then(() => {
        res.json({
          message: "Order Created"
        });
      }).catch(() => {
        res.status(500).json({
          message: "Order Not Created"
        });
      });
    });
  }
  

export function getOrders(req,res){
    if(req.user == null){
        res.status(403).json({
            message: "You Need to Login First"
        })
        return;
    }

    if(req.user.role == 'admin'){
        Order.find().then((orders) => {
            res.json(orders);
        }).catch(() => {
            res.status(500).json({
                message: "Orders Not Found"
            })
        })
    }else{
        Order.find({
            email: req.user.email
        }).then((orders) => {
            res.json(orders);
            console.log(orders);
        }).catch(() => {
            res.status(500).json({
                message: "Orders Not Found"
            })
        })
    }

    
}

export async function updateOrder(req, res) {
    try {
      if (req.user == null) {
        return res.status(403).json({ message: "You need to login first" });
      }
  
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "You are not allowed to update orders" });
      }
  
      const orderID = req.params.orderID;
  
      // Only allow status updates
      const newStatus = req.body.status;
      if (!newStatus) {
        return res.status(400).json({ message: "Status is required" });
      }
  
      const updatedOrder = await Order.findOneAndUpdate(
        { orderID },
        { status: newStatus },
        { new: true }  // Return the updated document
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.json({
        message: "Order status updated successfully",
        order: updatedOrder
      });
    } catch (err) {
      console.error("Error updating order:", err);
      res.status(500).json({ message: "Order not updated" });
    }
  }
  

export async function deleteOrder(req,res){
    try{
        if(req.user == null){
            res.status(403).json({
                message: "You Need to Login First"
            })
            return;
        }
        if(req.user.role != 'admin'){
            res.status(403).json({
                message: "You are not allowed to delete orders"
            })
            return;
        }

        const orderID = req.params.orderID;
        const order = await Order.findOneAndDelete({orderID: orderID}).then(() => {
            res.json({
                message: "Order Deleted"
            })
        })
    
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Order Not Deleted"
        });
    }
}
import Contact from "../models/Contact.js";

export const postContactMsg = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contactMsg = await Contact.create({
      name,
      email,
      message,
    });
    res.status(200).json(contactMsg);
  } catch (error) {
    res.status(500).json({ msg: "Failed to create contact Msg" });
  }
};

export const getContactMsg = async (req, res) => {
  try {
    const contactMsg = await Contact.find();
    res.status(200).json(contactMsg);
  } catch (error) {
    res.status(500).json({ msg: "Failed to get contact Msg" });
  }
};

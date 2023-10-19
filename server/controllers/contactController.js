const Contact = require("../models/contactModel");
const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validateCreateContact = (data) => {
  return createContactSchema.validate(data);
};

// @desc get all contacts
// @route GET/api/contacts
// @access public

const getContacts = async (req,res)=>{
   try {
     const contacts = await Contact.find();
     res.json(contacts);
   } catch (error) {
       res.status(500).json({message:error.message});
       console.log("All contacts list");
   }
}

// @desc create new contacts
// @route POST/api/contacts
// @access public

const createContact = async (req, res) => {
  try {
    const { error } = validateCreateContact(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, phone } = req.body;

    const userExist = await Contact.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = new Contact({
      name,
      email,
      phone,
    });

    await newUser.save(); 

    res.status(201).json({ message: "New contact added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc get contact
// @route GET/api/contacts/:id
// @access public

const getContact = async (req,res)=>{
   try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
          res.status(404).json({ message: "Contact not found !" });
        }
        return res.status(200).json({contact});

   } catch (error) {
     res.status(500).json({message:"Contact not found !"});
   }
}

// @desc Update contact
// @route PUT/api/contacts/:id
// @access public

const updateContact = async (req,res)=>{
    const contact = await  Contact.findById(req.params.id);
    if(!contact){
        res.status(404).json("Contact not found !");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedContact);
}

// @desc Delete contact
// @route DELETE/api/contacts/:id
// @access public

const deleteContact = async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
     if(!contact){
        res.status(404).json("Contact not found !");
    }
    await Contact.deleteOne();
    res.status(200).json(contact);
};

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact};
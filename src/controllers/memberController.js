const Member = require('../models/member');

// function to get all members
const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// function to get a single member by id
const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ msg: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Member not found' });
    }
    res.status(500).send('Server Error');
  }
};

// function to create a new member

const createMember = async (req, res) =>{
  const { community, user, roles } = req.body;

  try {
    // Create a new member document using the Member model
    const member = new Member({ community, user, roles });

    // Save the new member document to the database
    await member.save();

    // Respond with a 201 status code and the new member document
    res.status(201).json(member);
  } catch (error) {
    // Respond with a 500 status code and the error message
    res.status(500).json({ message: error.message });
  }
}



// function to update a member by id

const updateMemberById = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { community, user, roles } = req.body;

    const updatedMember = await Member.findByIdAndUpdate(
      memberId,
      { community, user, roles },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ error: 'Member not found' });
    }

    return res.status(200).json(updatedMember);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



// function to delete a member by id
const deleteMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ msg: 'Member not found' });
    }
    await member.remove();
    res.status(200).json({ msg: 'Member removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Member not found' });
    }
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMemberById,
  deleteMemberById
}
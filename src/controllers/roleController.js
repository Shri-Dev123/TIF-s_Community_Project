const Role = require('../models/role');

const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = new Role({ name });
    await role.save();
    res.status(201).json({ message: 'Role created successfully', role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ roles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const roles = await Role.findById(id);
    if (!removeEventListener) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json({ roles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const role = await Role.findByIdAndUpdate(id, { name }, { new: true });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json({ message: 'Role updated successfully', role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const roles = await Role.findByIdAndDelete(id);
    if (!roles) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json({ message: 'Role deleted successfully', roles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateRoleById = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const roles = await Role.findByIdAndUpdate(id, { name }, { new: true });
      if (!roles) {
        return res.status(404).json({ message: 'Role not found' });
      }
      res.status(200).json({ message: 'Role updated successfully', roles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const deleteRoleById = async (req, res) => {
    try {
      const { id } = req.params;
      const roles = await Role.findByIdAndDelete(id);
      if (!roles) {
        return res.status(404).json({ message: 'Role not found' });
      }
      res.status(200).json({ message: 'Role deleted successfully', roles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = {
createRole,
deleteRole,
deleteRoleById,
getRoleById,
updateRoleById,
getAllRoles,
updateRole
}
  
  // module.exports = (req, res, next) => {
  //   const { role } = req.user;
  //   if (role !== 'admin' && req.originalUrl.includes('/users/me')) { // check for /users/me route
  //     return res.status(403).json({ message: 'Forbidden' });
  //   }
  //   next();
  // };
  
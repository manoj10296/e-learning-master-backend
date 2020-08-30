const User = require('../models/User');

const { addUserToPool, loginUser } = require('../services/aws/index')

module.exports.getAllUsers = async() => {
  try {
    const result = await User.findAll();

    return result;
  } catch (error) {
    console.log(error);
  }

}

module.exports.createUser = async ( data ) => {
  try {
    // const resultFromAws = await addUserToPool(data)
    console.log('resultfromaws',resultFromAws)
    const result = await User.create({...data});
    
    return result;
  } catch (error) {
    console.log('func', error)
  }
}

module.exports.login = async (data) => {
  try{
    const resultFromAws = await loginUser(data)
    const user = await User.findOne({where: {
      email: data.email
    }}).then(res => res.toJSON())
    console.log('success', resultFromAws, user)
  } catch(err) {
    console.log('login ', err)
  }
}
const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: 'user',
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: 'user',
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: 'user',
  },
  {
    id: 4,
    name: 'admin guy',
    email: 'admin@gmail.com',
    password: 'admin123!',
    role: 'admin',
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },

  findByProfile: (profile) =>{
    //try and use the displayname, if its null just use username
    if (profile.displayName != null){
      user_name = profile.displayName
    } else{
      user_name = profile.username
    }
    //find the user under the name
    const user = database.find((user)=> user.name===user_name);
      if (user) {
        return user;
      } else {
          //add a new user to the database, role is default admin
          const newUser = {id:database[database.length -1].id+1,name:user_name, email:'', password: '', role:'admin'}
          database.push(newUser)
          return newUser
      }
    throw new Error(`Couldn't find user with login: ${user_name}`);
  }
};

module.exports = { database, userModel };

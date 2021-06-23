const UserController = {
    get : (req, res) => {
        console.log(`GET from UserController`);
        
        return res.send('get from controller'); 
    },

    post : (req, res) => {
        console.log('POST from UserController');

        return res.send('POST from UserController');
    },

    put : (req, res) => {
        console.log('PUT from UserController');
    },

    del : (req, res) => {
        console.log('DELETE from UserController');
    }
}

module.exports = UserController;
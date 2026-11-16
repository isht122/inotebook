const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = process.env.JWT_SECRET;


// Route-1: Create a User using: POST "/api/auth/createuser ". Does't require Auth

router.post('/createuser',[
    body('email', 'Please enter a valid email').isEmail(),
    body('name', 'Please enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async(req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // check whether the user with this email exists already

    try {
   let user = await User.findOne({ email: req.body.email });
    if (user) {
        sucess= false;
        return res.status(400).json({sucess, error: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // create a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    })
    
    // res.json(user)
    const token = jwt.sign({ user: { id: user.id } }, JWT_SECRET);
    // res.json({ message: 'User created successfully', user });
    success = true;
    res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).send({success, error: 'Internal server error' });
}
});


// Route-2: Authenticate a User using: POST "/api/auth/login". No login required

router.post('/login',[
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').not().isEmpty()
], async(req, res) => {
    let success = false;
  // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: 'Please try to login with correct credentials' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error: 'Please try to login with correct credentials' });
        }

        const token = jwt.sign({ user: { id: user.id } }, JWT_SECRET);
        success = true;
        res.json({ success, token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success, error: 'Internal server error' });
    }
});

// Route-3: Get the user details using: GET "/api/auth/getuser". Login required
try {
    router.post('/getuser', fetchuser, async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.send(user);
        } catch (error) {
            res.status(401).send({success, error: 'Please authenticate using a valid token' });
        }
    });
} catch (error) {
    console.error(error);
    res.status(500).send({ success, error: 'Internal server error' });
}

module.exports = router;


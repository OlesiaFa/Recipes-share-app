import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Register userS
export const register = async(req, res) => {
    try {
        const {userName, password} = req.body;
        
        const isUsed = await User.findOne ({userName})

        if(isUsed) {

                return res.json({
                message: 'This user is already registered' ,
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        const newUser = new User({
            userName,
            password: hash,
        })
       
        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            {expiresIn: '30d'},
        )

        await newUser.save();
       
        res.json({
            newUser,
            token,
            massage: 'Registration was successful',
        })
    }catch (error) {
        
        res.json({message: 'Error creating user' })
    }
}

//Login
export const login = async(req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName});
        if(!user) {
            return res.json({
                message: 'This user not found',
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.json({
                message: 'Incorrect password',
            })
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET,
           { expiresIn: '30d'},
    )

    res.json({
        token,
        user,
        message: 'You are logged in',
    })
    }catch (error) {
        res.json({message: 'Error authorization' })
    }
}

export const getMe = async(req, res) => {
    try {
        const user = await User.findById(req.userId)

        if(!user) {
            return res.json({
                message: 'This user not found',
            })
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET,
           { expiresIn: '30d'},
    )

    res.json({
        user,
        token,
    })

    }catch (error) {
        res.json({message: 'No accesse' })
    }
}


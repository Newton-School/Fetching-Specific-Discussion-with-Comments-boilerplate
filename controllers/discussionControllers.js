const Comment = require("../models/comment.js");
const Discussion   = require("../models/discussion.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'NEWTONSCHOOL';

const getAllDiscussion =async (req, res) => {

    const allDiscussion = await Discussion.find({});
    res.status(200).json({
        status: "success",
        data: allDiscussion
    })
   
}


const createDiscussion = async (req, res) => {

    const {heading, body, token } = req.body;

    try{
        if(!token){
            res.status(401).json({
                status: 'fail',
                message: 'Missing token'
            });
        }
        let decodedToken;
        try{
            decodedToken = jwt.verify(token, JWT_SECRET);
        }catch(err){
            res.status(401).json({
                status: 'fail',
                message: 'Invalid token'
            });
        }
        const newDiscussion = {
            heading,
            body,
            creator_id : decodedToken.userId
        };
        const discussion = await Discussion.create(newDiscussion);
        res.status(200).json({
            message: 'Discussion added successfully',
            discussion_id: discussion._id,
            status: 'success'
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

const deleteDiscussion = async (req, res) => {

    const id = req.params.id;

    const discussion = await Discussion.findById(id);
    if(!discussion)
    {
        res.status(404).json({
            status: 'fail',
            message: "Given Discussion doesn't exist"
        })
    }

    try{
        await Discussion.findByIdAndDelete(id);
        res.status(200).json({
            status: 'success',
            message: 'Discussion deleted successfully'
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}

const updateDiscussion = async (req, res) => {

    const id = req.params.id;

    const discussion = await Discussion.findById(id);

    if(!discussion)
    {
        res.status(404).json({
            status: 'fail',
            message: "Given Discussion doesn't exist"
        })
    }

    try{
        await Discussion.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Discussion updated successfully'
        });
    } catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    };

}

/*

getDiscussion Controller

Get the discussion with given id in req.params.
The discussion should contain an Array of comments object for that discussion.
The comment object should contain _id, content, authorId, and discussionId for every comment for that discussion.
Response --> 

1. Success

200 Status code
json = {
  status: 'success',
  data: {
    heading : xyz,
    body : xyz,
    creator_id : xyz,
    comments:[
        {
            _id,
            content,
            authorId,
            discussionId,
        }
    ]
  }
}

2. Discussion Doesnot exist

404 Status Code
json = {
    status: 'fail',
    message: 'Given Discussion doesn't exist'
}

3. Something went wrong

500 Status Code
json = {
    status: 'fail',
    message: 'Something went Wrong'
}

*/

const getDiscussion = async (req, res) => {

    const id = req.params.id;

    try{
       //Write your code here.
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: "Something went Wrong"
        })
    }

}

module.exports = { getAllDiscussion, getDiscussion, createDiscussion, deleteDiscussion, updateDiscussion };

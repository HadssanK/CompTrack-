// models/Issue.js
import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  issueType: {
    type: String,
    required: true,
    enum: ['Salary', 'IT Support', 'Leave Request', 'HR Complaint', 'Network', 'Other']
  },
  description: {
    type: String,
    required: true
  },
  status: {
  type: String,
  enum: ['Pending', 'Accepted', 'Rejected'],
  default: 'Pending'
},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const IssueModel = mongoose.model('EmpIssue' , IssueSchema)
export default IssueModel;
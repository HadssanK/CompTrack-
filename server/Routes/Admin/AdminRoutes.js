import express from 'express';
import {GetAllIssues , UpdateIssueStatus , DeleteIssue} from '../../Controller/Admin/AdminController.js';

const Adminrouter = express.Router();

// Get all issues
Adminrouter.get('/issues',GetAllIssues);

// Update issue status
Adminrouter.put('/issue/:id/status',UpdateIssueStatus);

// Delete issue
Adminrouter.delete('/issue/:id',DeleteIssue);

export default Adminrouter;

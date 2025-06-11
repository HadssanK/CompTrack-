import express from "express";
import {
    CreateIssue,
    GetAllIssues,
    UpdateIssueStatus,
    DeleteIssue,
    GetUserIssues,
} from "../../Controller/User/EmpIssue.js";
const IssueRouter = express.Router();

IssueRouter.post('/issues', CreateIssue);
IssueRouter.get('/issues', GetAllIssues);
IssueRouter.get('/issues/user/:name', GetUserIssues); // Optional
IssueRouter.patch('/issues/:id', UpdateIssueStatus);
IssueRouter.delete('/issues/:id', DeleteIssue);


export default IssueRouter;

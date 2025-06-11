import Issue from '../../models/User/EmpIssue.js';

// 👉 Create new issue (Employee)
const CreateIssue = async (req, res) => {
  try {
    const { name, issueType, description } = req.body;

    const NewIssue = new Issue({
      name,
      issueType,
      description,
      status: 'Pending'
    });

    await NewIssue.save();
    res.status(201).json({ message: 'Issue submitted successfully', issue: NewIssue });
  } catch (error) {
    res.status(500).json({ message: 'Error creating issue', error });
  }
};

// 👉 Get all issues (Admin)
const GetAllIssues = async (req, res) => {
  try {
    const Issues = await Issue.find().sort({ createdAt: -1 });
    res.status(200).json(Issues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issues', error });
  }
};

// 👉 Update issue status (Admin - Accept / Reject)
const UpdateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const UpdatedIssue = await Issue.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json({ message: 'Issue status updated', issue: UpdatedIssue });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
};

// 👉 Delete issue (Admin)
const DeleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    await Issue.findByIdAndDelete(id);
    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting issue', error });
  }
};

// 👉 Get single user's issues (Optional)
const GetUserIssues = async (req, res) => {
  try {
    const { name } = req.params;
    const UserIssues = await Issue.find({ name });
    res.status(200).json(UserIssues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user issues', error });
  }
};

// ✅ Export all
export  {
  CreateIssue,
  GetAllIssues,
  UpdateIssueStatus,
  DeleteIssue,
  GetUserIssues
};

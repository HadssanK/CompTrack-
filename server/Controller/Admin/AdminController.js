import Issue from '../../models/User/EmpIssue.js';

// 👉 Get all issues (Admin)
const GetAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issues', error });
  }
};

// 👉 Update issue status (Admin - Accept / Reject / Pending)
const UpdateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.status(200).json({ message: 'Issue status updated', issue: updatedIssue });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
};

// 👉 Delete issue (Admin)
const DeleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Issue.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting issue', error });
  }
};

export  {
  GetAllIssues,
  UpdateIssueStatus,
  DeleteIssue
};

import Applicant from '../models/applicant_model';

export const createApplication = (req, res, next) => {
  const applicant = new Applicant({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    year: req.body.year,
    school: req.body.school,
    major: req.body.major,
    gpa: req.body.gpa,
    languages: req.body.languages,
    proficiencies: req.body.proficiencies,
    courses: req.body.courses,
    github: req.body.github,
    linkedin: req.body.linkedin,
    experience: req.body.experience,
    extraCurriculars: req.body.extraCurriculars,
    preferredLocations: req.body.preferredLocations,
    international: req.body.international,
    references: req.body.references,
    phoneNumber: req.body.phoneNumber,
    whyRTC: req.body.whyRTC,
  });
  applicant.save()
  .then((result) => {
    res.json({ message: 'Application received!' });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
export const getApplicants = (req, res, next) => {
  Applicant.find({})
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
// export const getPost = (req, res) => {
//   Post.findById(req.params.id)
//   .populate('author')
//   .exec((err, post) => {
//     if (err) res.status(500).json({ err });
//     res.json(post);
//   });
// };
// export const deletePost = (req, res) => {
//   Post.findById(req.params.id).remove()
//   .then((result) => {
//     res.json({ message: 'Post deleted!' });
//   })
//   .catch((error) => {
//     res.status(500).json({ error });
//   });
// };
// export const updatePost = (req, res) => {
//   Post.findByIdAndUpdate(req.params.id, { $set: req.body })
//   .then((result) => {
//     res.json({ message: 'Post updated!' });
//   })
//   .catch((error) => {
//     res.status(500).json({ error });
//   });
// };

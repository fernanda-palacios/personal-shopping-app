import User from '../models/user.js';


export const saveOnboardingForm = async (req, res) => {

    const birthDate = req.body.birthDate;
    const genderIdentification = req.body.genderIdentification;
    const country = req.body.country;

    try {
        const user = await User.findOne({ username: req.session.username });
      
        user.birthDate = birthDate
        user.genderIdentification = genderIdentification
        user.country = country

        user.save((err, user) => {
          if (err) res.status(500).end(err);
          else res.json({user});
        });

    } catch (err) {
        return res.status(500).end(err);
    }
}


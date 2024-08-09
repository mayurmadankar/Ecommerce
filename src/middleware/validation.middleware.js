import{body,validationResult} from 'express-validator';

export const validationResult=async (req,res,next)=>{
    const rules=[
        body('name').notEmpty().withMessage("Name is required"),
        body('email').isEmail().withMessage("Invalid email address"),
        body('password').notEmpty().withMessage("Password is required"),
    ];
    await Promise.all(rules.map(rule=>rule.run(req)));

    const validationErrors=validationResult(req);

    if(!validationErrors.isEmpty()){
        res.status(400).send('Required Valid Credentials');
    }
    next();
};

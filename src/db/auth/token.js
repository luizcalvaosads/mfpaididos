import jwt from "jsonwebtoken"; 

const key = "UeA6h%Nd7jEGw2iCpjdmpDk#kTBMRst4gG%C#qTufNQ8n&AZmLwQ%R^9E$C8tda^AUj&5rrP4V@hgDeYprQiGsuDMxYeFpG!z2LfoqvYPbDoFeH$rv&zaLxyu^56fjh9!9Q9nbak4$JTVC7#VV3GF@"


const generate = (idUser) => {
    const token = jwt.sign({ id: idUser }, key);
    return token;
};

export { generate, key };
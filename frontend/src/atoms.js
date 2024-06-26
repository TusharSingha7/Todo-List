
import {atom} from 'recoil'
export const titAtom = atom({
    key:"titAtom",
    default:""
});
export const desAtom = atom({
    key:"desAtom",
    default:""
});
export const lisAtom = atom({
    key:"lisAtom",
    default:[]
});
export const eventAtom = atom({
    key:"eventAtom",
    default:false
});
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import validateCreateProduct from "./validateCreateProduct";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { postFindOrCreate } from "../request/clients";
import { setUserInfoAction, showError } from "../redux/actions";
import { ADMIN, CLIENT } from "./roles";
import { validateUpdateUser } from "./validateUpdateUser";
import { getCart } from "../request/cart";
import validateCreateProfessional from "./validateCreateProfessional";
import validateCreateService from "./validateCreateService";

const firebaseConfig = {
  apiKey: "AIzaSyAACot6qy29p4K1ra6oQ_1CGVjDTbe0dsw",
  authDomain: "beautify-386112.firebaseapp.com",
  projectId: "beautify-386112",
  storageBucket: "beautify-386112.appspot.com",
  messagingSenderId: "147710965841",
  appId: "1:147710965841:web:a513945b789016403ee070",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

const storage = getStorage(firebaseApp);

export const createUserWithMail = async (username, password) => {
  return await createUserWithEmailAndPassword(auth, username, password);
};

export const singUpWithMail = async (username, password) => {
  return await signInWithEmailAndPassword(auth, username, password);
};

// para subir una imagen al storage

export const upload = async (
  archivo,
  setProductData,
  productData,
  setErrors
) => {
  // crea una referencia al archivo
  const archivoRef = ref(storage, `images/${archivo.name}`);
  // sube el archivo a esa referencia
  await uploadBytes(archivoRef, archivo);
  // devuelve la url del archivo
  const url = await getDownloadURL(archivoRef);

  setProductData({ ...productData, image: url });
  validateCreateProduct({ ...productData, image: url }, setErrors);
};
export const uploadProfessionalPhoto = async (
  archivo,
  setCreationInfo,
  creationInfo,
  setErrors
) => {
  // crea una referencia al archivo
  const archivoRef = ref(storage, `images/${archivo.name}`);
  // sube el archivo a esa referencia
  await uploadBytes(archivoRef, archivo);
  // devuelve la url del archivo
  const url = await getDownloadURL(archivoRef);

  console.log(url);

  setCreationInfo({ ...creationInfo, imageProfessional: url });
  validateCreateProfessional(
    { ...creationInfo, imageProfessional: url },
    setErrors
  );
};
export const uploadServicePhoto = async (
  archivo,
  setCreationInfo,
  creationInfo,
  setErrors
) => {
  // crea una referencia al archivo
  const archivoRef = ref(storage, `images/${archivo.name}`);
  // sube el archivo a esa referencia
  await uploadBytes(archivoRef, archivo);
  // devuelve la url del archivo
  const url = await getDownloadURL(archivoRef);

  // console.log(url);

  setCreationInfo({ ...creationInfo, imageService: url });
  validateCreateService({ ...creationInfo, imageService: url }, setErrors);
};

export const uploadProfilePicture = async (
  archivo,
  setUpdatedData,
  updatedData,
  setErrors,
  visibleInputs
) => {
  // crea una referencia al archivo
  const archivoRef = ref(storage, `images/${archivo.name}`);
  // sube el archivo a esa referencia
  await uploadBytes(archivoRef, archivo);
  // devuelve la url del archivo
  const url = await getDownloadURL(archivoRef);

  setUpdatedData({ ...updatedData, image: url });
  setErrors(
    validateUpdateUser(
      { ...updatedData, image: url },
      visibleInputs,
      updatedData
    )
  );
};

export const loginWithGoogleFirebase = async (
  usuarioFirebase,
  dispatch,
  navigate,
  locationNow
) => {
  try {
    // recibe el usuario de google y lo busca/crea en la bdd
    const response = await postFindOrCreate({
      email: usuarioFirebase.email,
      fullName: usuarioFirebase.displayName,
      phone: usuarioFirebase.phoneNumber,
      image: usuarioFirebase.image || null,
    });
    if (!response) return;
    const dbClient = response.data;
    if (dbClient.banned) {
      navigate("/");
      dispatch(
        showError({
          tittle: "Banned-user",
          message: "Sory, looks like you've been banned",
        })
      );
      return;
    }

    const userData = {
      id: dbClient.id,
      name: dbClient.fullName,
      email: usuarioFirebase.email,
      rol: CLIENT,
    };

    if (
      userData.email === "beautifyfinalproyect@gmail.com" ||
      userData.email === "BeautifyStaff@hotmail.com"
    ) {
      userData.rol = ADMIN;
    }

    localStorage.setItem("userData", JSON.stringify(userData));
    //Se chequea previamente si hay algo en el localStorage porque sino lo borra
    const cartLS = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartLS.length === 0) {
      const cartSaved = await getCart(userData.id);
      localStorage.setItem("cart", JSON.stringify(cartSaved.data));
    }

    // setear el estado global
    dispatch(setUserInfoAction(userData));

    // locationNow.pathname === "/" && navigate("/home");
    return userData;
  } catch (error) {
    navigate("/");
    console.log(error.message);
  }
};

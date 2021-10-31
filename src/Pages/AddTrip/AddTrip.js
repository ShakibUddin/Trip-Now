import { faEdit, faImage, faMapMarkerAlt, faMoneyBillAlt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Modal from 'react-modal';
import * as Yup from 'yup';
import useData from '../../Hooks/useData';
import complete from '../../images/complete.png';
import failed from '../../images/failed.png';
//modal style
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%) scale(0.65,0.75)',
    },
};

// binding modal to  appElement 
Modal.setAppElement("#root");

const AddTrip = () => {

    const {
        tripAdded, handleAddTrip, addTripError
    } = useData();

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
        //after user closes modal rediret to home
    }

    const imageUrl = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters')
            .max(30, 'Name must be at least 30 characters'),
        description: Yup.string()
            .required('Description is required')
            .min(6, 'Description must be at least 6 characters')
            .max(100, 'Description must be at least 100 characters'),
        imageUrl: Yup.string()
            .required('Image Url is required')
            .matches(imageUrl, { message: "Invalid image url", excludeEmptyString: true })
            .min(6, 'Image Url must be at least 6 characters')
            .max(1000, 'Image Url must be at least 1000 characters'),
        price: Yup.number()
            .typeError('Invalid Price Type')
            .required('Price is required')
            .min(1000, 'Price must be minimum 1000')
            .max(100000, 'Price can not be more than 100000'),
        day: Yup.number()
            .typeError('Invalid Days Type')
            .required('Days is required')
            .min(1, 'Days must be minimum 1')
            .max(30, 'Days can not be more than 30'),
        night: Yup.number()
            .typeError('Invalid Nights Type')
            .required('Nights is required')
            .min(1, 'Nights must be minimum 1')
            .max(30, 'Nights can not be more than 30'),
        breakfast: Yup.boolean(),
        lunch: Yup.boolean(),
        dinner: Yup.boolean(),

    }).required();
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState: { errors } } = useForm(formOptions);

    const onSubmit = data => {
        handleAddTrip(data);
        openModal();
        reset();
    };

    return (
        <form className="lg:w-4/12 md:w-8/12 sm:w-full mx-auto p-2 m-2 flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-4xl py-10 font-extrabold text-center">Add A New Trip</p>

            {/* name of destination */}
            <div className="w-full flex justify-between bg-white items-center border-2 rounded-md my-2">
                <FontAwesomeIcon className="w-1/12 text-2xl text-center mx-auto" icon={faMapMarkerAlt} />
                <input className="w-11/12 p-3 my-2 rounded-md border-0 outline-none" type="text" placeholder="Enter Destination" pref {...register("name")} />
            </div>
            {errors.name && <p className="w-full text-start text-red-600 font-bold">{errors.name?.message}</p>}

            {/* trip description */}
            <div className="w-full flex justify-between bg-white items-center border-2 rounded-md my-2">
                <FontAwesomeIcon className="w-1/12 text-2xl text-center mx-auto" icon={faEdit} />
                <textarea className="w-11/12 p-3 my-2 border-0 outline-none rounded-md" type="text" placeholder="Enter Description" {...register("description")} />
            </div>
            {errors.description && <p className="w-full text-start text-red-600 font-bold">{errors.description?.message}</p>}

            {/* image url */}
            <div className="w-full flex justify-between bg-white items-center border-2 rounded-md my-2">
                <FontAwesomeIcon className="w-1/12 text-2xl text-center mx-auto" icon={faImage} />
                <input className="w-11/12 p-3 my-2 border-0 outline-none rounded-md" type="text" placeholder="Enter Image Url" {...register("imageUrl")} />
            </div>
            {errors.imageUrl && <p className="w-full text-start text-red-600 font-bold">{errors.imageUrl?.message}</p>}

            {/* number of days in trip */}
            <div className="w-full flex justify-between bg-white items-center border-2 rounded-md my-2">
                <FontAwesomeIcon className="w-1/12 text-2xl text-center mx-auto" icon={faSun} />
                <input className="w-11/12 p-3 my-2 border-0 outline-none rounded-md" type="number" placeholder="Enter Total Days" {...register("day")} />
            </div>
            {errors.day && <p className="w-full text-start text-red-600 font-bold">{errors.day?.message}</p>}

            {/* number of nights in trip */}
            <div className="w-full flex justify-between bg-white items-center border-2 rounded-md my-2">
                <FontAwesomeIcon className="w-1/12 text-2xl text-center mx-auto" icon={faMoon} />
                <input className="w-11/12 p-3 my-2 border-0 outline-none rounded-md" type="number" placeholder="Enter Total Nights" {...register("night")} />
            </div>
            {errors.night && <p className="w-full text-start text-red-600 font-bold">{errors.night?.message}</p>}

            {/* select meal */}
            <p className="text-2xl my-2 font-bold">Select Meal</p>
            <div className="flex w-full p-3 my-2 border-2 outline-none rounded-md bg-white justify-center ">
                {/* is breakfast included in trip */}
                <div style={{ minWidth: "80px" }} className="w-1/5 m-2 flex justify-center items-center">
                    <input type="checkbox" name="breakfast" {...register("breakfast")} />
                    <label htmlFor="breakfast">Breakfast</label>
                </div>

                {/* is lunch included in trip */}
                <div style={{ minWidth: "80px" }} className="w-1/5 m-2 flex justify-center items-center">
                    <input type="checkbox" name="lunch" {...register("lunch")} />
                    <label htmlFor="lunch">Lunch</label>
                </div>

                {/* is dinner included in trip */}
                <div style={{ minWidth: "80px" }} className="w-1/5 m-2 flex justify-center items-center">
                    <input type="checkbox" name="dinner" {...register("dinner")} />
                    <label htmlFor="dinner">Dinner</label>
                </div>
            </div>

            {/* price */}
            <div className="w-full flex justify-between bg-white items-center border-2 rounded-md my-2">
                <FontAwesomeIcon className="w-1/12 text-2xl text-center mx-auto" icon={faMoneyBillAlt} />
                <input className="w-11/12 p-3 my-2 border-0 outline-none rounded-md" type="number" placeholder="Enter Price" {...register("price")} />
            </div>
            {errors.price && <p className="w-full text-start text-red-600 font-bold">{errors.price?.message}</p>}


            {/* submit button */}
            <input className="w-full mx-auto px-4 p-2 bg-blue-600 rounded-md text-white cursor-pointer" type="submit" name="ADD Trip" />
            {addTripError && <p className="w-full text-start text-red-600 font-bold">{addTripError}</p>}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Trip Now"
            >

                <div className="w-full flex flex-col justify-center items-center">
                    <div className="mx-auto w-3/12">
                        <img className="w-full" src={tripAdded ? complete : failed} alt="" />
                    </div>

                    {tripAdded === 1 && <p className="text-3xl py-10 text-green-600 font-extrabold text-center">Trip added successfully</p>}
                    {tripAdded === 0 && <p className="text-3xl py-10 text-red-600 font-extrabold text-center">Trip addition failed</p>}
                    <button className="lg:w-2/4 w-3/4 mx-auto px-4 p-2 bg-red-600 rounded-md text-white cursor-pointer" onClick={closeModal}>close</button>
                </div>
            </Modal>
        </form>
    );
};

export default AddTrip;
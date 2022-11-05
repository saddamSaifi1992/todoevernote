import {
	doc,
	collection,
	addDoc,
	getDocs,
	deleteDoc,
} from "firebase/firestore/lite";
import { useState, useEffect, useContext } from "react";
import { app, database } from "../../api/firebaseConfig";
import { Context } from "./context/EvernoteContext";
import Swal from "sweetalert2";

export default function NoteBody() {
	const { state, dispatch } = useContext(Context);
	const [notesArray, setNotesArray] = useState([]);
	const dbInstance = collection(database, "notes");

	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});

	const deleteNote = (id) => {
		const collectionById = doc(database, "notes", id);

		deleteDoc(collectionById).then(() => {
			Toast.fire({
				icon: "success",
				title: "Successfully Deleted",
			});
			window.location.reload();
		});
	};
	const editNote = (id) => {
		const collectionById = doc(database, "notes", id);

		updateDoc(collectionById, {
			noteTitle: noteTitle,
			noteDesc: noteDesc,
		}).then(() => {
			window.location.reload();
		});
	};
	useEffect(() => {
		const getNotes = () => {
			getDocs(dbInstance).then((data) => {
				setNotesArray(
					data.docs.map((item) => {
						return { ...item.data(), id: item.id };
					})
				);
			});
		};
		getNotes();
	}, []);
	return (
		<>
			<div>
				{notesArray.map((note, i) => {
					return (
						<div
							key={i}
							className=' pt-3 -mx-2 transition-colors duration-300 transform mt-1 bg-gray-100  '
						>
							<h3 className='text-2xl px-4 capitalize border-b border-gray-300 pb-3'>
								{note.noteTitle}
								<a
									className='float-right cursor-pointer'
									onClick={() => deleteNote(note.id)}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='w-4 h-4 text-red-600'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
										/>
									</svg>
								</a>
							</h3>
							{note.noteDesc !== "" ? (
								<div>
									<p className='text-sm p-4 text-gray-600'>
										{note.noteDesc}
									</p>
								</div>
							) : (
								""
							)}
						</div>
					);
				})}
			</div>
		</>
	);
}

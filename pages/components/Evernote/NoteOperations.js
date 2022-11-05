import { useContext, useState } from "react";
import { app, database } from "../../api/firebaseConfig";
import { collection, addDoc } from "firebase/firestore/lite";
import Swal from "sweetalert2";
import { Context } from "./context/EvernoteContext";

export default function NoteOperations() {
	const [isInputVisible, setInputVisible] = useState(false);
	const { state, dispatch } = useContext(Context);
	const [noteTitle, setNoteTitle] = useState("");
	const [noteDesc, setNoteDesc] = useState("");
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

	const inputToggle = () => {
		setInputVisible(!isInputVisible);
	};
	const saveNote = () => {
		addDoc(dbInstance, {
			noteTitle: noteTitle,
			noteDesc: noteDesc,
		}).then(() => {
			setNoteTitle("");
			setNoteDesc("");
			inputToggle();
			dispatch({
				type: "UPDATE",
				payload: !state,
			});
			Toast.fire({
				icon: "success",
				title: "Successfully Added",
			});
		});
	};
	return (
		<>
			<div className=''>
				<button
					onClick={inputToggle}
					className='border-1 border-gray-300 bg-black text-white w-full py-2 px-2 mt-2'
				>
					Add a New Note
				</button>
			</div>

			{isInputVisible ? (
				<div className=''>
					<input
						className='border-1 border-gray-300 bg-gray-100 w-full py-2 px-2 mt-2'
						placeholder='Enter the Title..'
						onChange={(e) => setNoteTitle(e.target.value)}
					/>
					<textarea
						id='message'
						rows='4'
						className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-100 mt-1 rounded-none '
						placeholder='Your message...'
						onChange={(e) => setNoteDesc(e.target.value)}
					></textarea>
					<button
						onClick={saveNote}
						className='border-1 border-blue-500 bg-blue-300 w-full py-2 px-2 mt-2'
					>
						Save Note
					</button>
				</div>
			) : (
				<></>
			)}
		</>
	);
}

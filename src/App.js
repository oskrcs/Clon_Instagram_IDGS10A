import React, { useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { auth, db } from './firebase';
// import { TableBody } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import ImageUpload from './ImageUpload';

const style = {
	position:  'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };

function App() {
	// Esto es un state o algo asi
	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	//
	const [openSignIn, setOpenSignIn] = useState(false);
	//maneja la informacion del usuario
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	//verifica el estado del usuario
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//el usuario ingreso a su cuenta
				console.log(authUser);
				setUser(authUser);

			} else {
				// el usuario a salido de su cuenta
				setUser(null);
			}
		})

		return () => {
			//realiza acciones de limpieza
			unsubscribe();
		}
	}, [user, username]);

	//corre codigo especifico en base a una condicion especifica
	useEffect(() => {
		//aqui corre el codigo
		db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
			setPosts(snapshot.docs.map(doc => ({
				id: doc.id,
				post: doc.data()
			})));
		})
	}, []);

	//sube la informacion a firebase para crear al usuario
	const signUp = (event) => {	
		event.preventDefault();

		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				return authUser.user.updateProfile({
					displayName: username
				})
			})
			.catch((error) =>alert(error.message));

		setOpen(false);
	}

	//Sube la informacion para que el usuario ingrese a su cuenta
	const signIn = (event) => {
		event.preventDefault();

		auth
			.signInWithEmailAndPassword(email,password)
			.catch((error) => alert(error.message));

		setOpenSignIn(false);
	}



	return ( 
		<div className = "app">

			{/* Crea una ventana emergente*/}
			<Modal
				// Set open hace que cree la ventana
				open={open}
				onClose={() => setOpen(false)}
			>
				<Box sx={style}>
					<form className='app__signup'>
						<center>
							<img
								className="app__headerImage"
								src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
								alt=""
							/>
						</center>
						<Input
							placeholder="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Input
							placeholder="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button type="submit" onClick={signUp}>Registrar</Button>
					</form>
				</Box>
			</Modal>
		
			<Modal
				// Set open hace que cree la ventana
				open={openSignIn}
				onClose={() => setOpenSignIn(false)}
			>
				<Box sx={style}>
					<form className='app__signup'>
						<center>
							<img
								className="app__headerImage"
								src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
								alt=""
							/>
						</center>
						<Input
							placeholder="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button type="submit" onClick={signIn}>Ingresar</Button>
					</form>
				</Box>
			</Modal>
			{/* header */}
			<div className="app__header">
				<img
				className="app__headerImage"
          		src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
          		alt=""
				/>

				{/* Boton que depende del estado del usuario muestra cerrar sesion o crear*/}

				{user ? (
					<Button onClick={() => auth.signOut()}>Cerrar sesion</Button>
				) : (
					<div className="app__loginContainer">
						<Button onClick={() => setOpenSignIn(true)}>Ingresar</Button>
						<Button onClick={() => setOpen(true)}>Registrar</Button>
					</div>
				)}
      		</div>


			<div className="app__posts">
				{
					posts.map(({id, post}) => (
						<Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
					))
				}
			</div>

			{user?.displayName ? (
				<ImageUpload username={user.displayName} />
			) : (
				<h3>Necesita ingresar a su cuenta para subir una foto</h3>
			)}
		
	    </div>
    );
}

export default App
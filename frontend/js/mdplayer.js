//ЧЕРНОВИК!!!!!
class MDPlayer {
 	static objects = [];

	static rotX = 0.05;
	static rotY = 0.01;
	static rotZ = 0.05;

	static posX = 0.0;
	static posY = 0.0;
	static posZ = 0.0;

	constructor(background, fog) {
		

		this.init(MDScene.camera, MDScene.scene, MDScene.renderer, MDScene.light);
		this.update();
	}

	init(camera, scene, renderer, light) {
		camera.position.z = 5;

		MDScene.controls = new THREE.OrbitControls( camera, renderer.domElement );
		MDScene.controls.minPolarAngle = Math.PI * 1 / 4;
    	MDScene.controls.maxPolarAngle = Math.PI * 3 / 4;


		scene.add( light );
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
	}

	update() { // Вызов отрисовки.
		MDScene.renderer.render(MDScene.scene, MDScene.camera);
		MDScene.controls.update();
	}

	createMesh(quantity, geometry, material) { // Нуждается объектах, например: new THREE.BoxGeometry( 0.2, 0.2, 0.2 ); new THREE.MeshNormalMaterial();
	
		for (let i = quantity - 1; i >= 0; i--) {
			let mesh = new THREE.Mesh(geometry, material);

			MDScene.scene.add(mesh);
			MDScene.objects.push(mesh);
		}
		this.update();
	}

	set camX(x) {this.camera.position.x = x;}
	set camY(y) {this.camera.position.y = y;}
	set camZ(z) {this.camera.position.z = z;}
	get camX() {return this.camera.position.x;}
	get camY() {return this.camera.position.y;}
	get camZ() {return this.camera.position.z;}

}

//Список функций

function rand_position(){
	MDScene.objects.forEach(mesh => {
	mesh.position.x = Math.random()*40 -20;
	mesh.position.y = Math.random()*15 ;
	mesh.position.z = Math.random()*2 -40;
	});
	test.update(); // На всякий случай. Апдейт автоматически происходит при анимации.
}

function anim_update(){
	MDScene.objects.forEach((mesh, i) => {
	mesh.rotation.x += MDScene.rotX; //0.1
	mesh.rotation.y += MDScene.rotY; //0.01
	mesh.rotation.z += MDScene.rotZ; // 0.1

	//let vector3 = new THREE.Vector3( 0, 1, 0 );

	if (mesh.position.y > 1) {mover[i] = -1;}
	if (mesh.position.y < -1.9) {mover[i] = 1;} 
	mesh.position.y += 0.003 * mover[i];
	mesh.position.z += 0.03;
	});
	test.update(); // Отрисовка изменений
	requestAnimationFrame(anim_update); //Передача изменений шагом AnimationFrame.
}

function set_mesh(n){
	let geometry = new THREE.SphereGeometry(0.1, 16, 32);

	var texture = new THREE.TextureLoader().load( 'frontend/img/Football.jpg' );
	
	let material = new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.01,
	});
	//material.color = new THREE.Color( 0xff4f00 );
	test.createMesh(n, geometry, material);
}


function initEventListeners() {
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
}

function onWindowResize() {
    MDScene.camera.aspect = window.innerWidth / window.innerHeight;
    MDScene.camera.updateProjectionMatrix();
    MDScene.renderer.setSize(window.innerWidth, window.innerHeight);
}

function set_ground() {

	let texture = new THREE.TextureLoader().load( 'frontend/img/grasslight.jpg' );
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 25, 25 );
	texture.anisotropy = 16;
	texture.encoding = THREE.sRGBEncoding;

	let material = new THREE.MeshLambertMaterial( { map: texture } );

	let mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 400, 400 ), material );
	mesh.position.y = -2;
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	MDScene.scene.add( mesh );
}


//Вызовы

let test = new MDScene();
set_mesh(5000);
rand_position();

let mover = Array(MDScene.objects.length -1).fill(1);

anim_update();
initEventListeners();
set_ground();
console.log(MDScene.objects.length);
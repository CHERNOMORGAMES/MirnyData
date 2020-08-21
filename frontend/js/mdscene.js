class MDScene {
	static #MAX_INSTANCES = 1;
 	static #instances = 0;

 	static objects = [];
	static scene = new THREE.Scene();
	static camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	static renderer = new THREE.WebGLRenderer( { antialias: true } );

	static rotX = 0.1;
	static rotY = 0.01;
	static rotZ = 0.1;

	static posX = 0.0;
	static posY = 0.0;
	static posZ = 0.0;

	geometry;
	material;
	mesh;

	constructor(background, fog) {
		MDScene.#instances++;
    if (MDScene.#instances > MDScene.#MAX_INSTANCES) {throw new Error('MDScene is a singleton - instance already exists');}
		
		background ? MDScene.scene.background = background : MDScene.scene.background = new THREE.Color( 0x3b83bd );
		fog ? MDScene.scene.fog = fog : null; //Fog instance( color : Integer, near : Float, far : Float )

		this.#init(MDScene.camera, MDScene.scene, MDScene.renderer);
		this.update();
	}

	#init(camera, scene, renderer) {
		camera.position.z = 2;
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );
	}

	update() { // Вызов отрисовки.
		MDScene.renderer.render(MDScene.scene, MDScene.camera);
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

function mesh_position(){ // Прописать MDScene.objects.forEach(mesh => {});
	mesh.position.x = Math.random() * 4000 - 2000;
	mesh.position.y = Math.random() * 4000 - 2000;
	mesh.position.z = Math.random() * 4000 - 2000;
}


let test = new MDScene();

anim_update();

function anim_update(){
	test.mesh.rotation.x += MDScene.rotX; //0.1
	test.mesh.rotation.y += MDScene.rotY; //0.01
	test.mesh.rotation.z += MDScene.rotZ; // 0.1
	test.update();
	requestAnimationFrame(anim_update); //Передача изменений шагом AnimationFrame. На саму сцену изменения вносятся автоматически.
}

set_mesh(5);

function set_mesh(n){
	let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	let material = new THREE.MeshNormalMaterial();
	test.createMesh(n, geometry, material);
}
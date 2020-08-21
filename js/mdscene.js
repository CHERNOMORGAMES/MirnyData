
class MDTest {

	static camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	scene = new THREE.Scene();
	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();
	mesh = new THREE.Mesh( this.geometry, this.material );
	renderer = new THREE.WebGLRenderer( { antialias: true } );

	static rotX = 0.1;
	static rotY = 0.01;
	static rotZ = 0.1;

	constructor(){
		this.init(MDTest.camera, this.scene, this.geometry, this.material, this.mesh, this.renderer);
	}

	init(camera, scene, geometry, material, mesh, renderer) {

		camera.position.z = 2;

		scene.add(mesh);

		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

	//requestAnimationFrame(animate);

	//mesh.rotation.x += 0.2;
	//mesh.rotation.y += 0.5;
	//renderer.render(scene, camera);	
	}

	render(){
		test.renderer.render(test.scene, MDTest.camera);
	}

}

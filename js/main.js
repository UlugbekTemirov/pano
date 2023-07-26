document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("pano-container");
  const imageLinks = document.querySelectorAll(".image-link");

  let panoramas = [];

  for (let i = 0; i < imageLinks.length; i++) {
    panoramas.push(new PANOLENS.ImagePanorama(imageLinks[i].dataset.panorama));
  }

  function handleImageLinkClick(event) {
    const panoramaIndex = Array.from(imageLinks).indexOf(event.target);
    if (panoramaIndex >= 0) {
      viewer.setPanorama(panoramas[panoramaIndex]);
    }
  }

  imageLinks.forEach((link) => {
    link.addEventListener("click", handleImageLinkClick);
  });

  const viewer = new PANOLENS.Viewer({ container });

  for (let i = 0; i < panoramas.length; i++) {
    viewer.add(panoramas[i]);
    // panoramas[0].link(
    //   viewer[1],
    //   new THREE.Vector3(-3429.01, 1205.85, -3421.88),
    //   300
    // );
    // panoramas[1].link(
    //   panoramas[2],
    //   new THREE.Vector3(-3429.01, 1205.85, -3421.88)
    // );

    // panoramas[0].link(
    //   panoramas[2],
    //   new THREE.Vector3(-1106.42, -4277.19, -5000.0)
    // );
    // panoramas[2].link(
    //   panoramas[0],
    //   new THREE.Vector3(2092.2, -159.02, -4530.91)
    // );
  }

  function handlePanoramaClick(event) {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const rect = viewer.renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, viewer.camera);

    const intersects = raycaster.intersectObject(panorama1, true);

    if (intersects.length > 0) {
      const position = intersects[0].point;

      console.log("Depth:", position.z);
      console.log("Height:", position.y);
      console.log("Width:", position.x);
    }
  }

  viewer.renderer.domElement.addEventListener("click", handlePanoramaClick);
});

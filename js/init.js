let run = document.getElementById("run")

import * as THREE from 'three';
import { GUI } from '../js/jsm/libs/lil-gui.module.min.js';

// import { OrbitControls } from '../js/jsm/controls/OrbitControls.js';


import { GLTFLoader } from '../js/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from '../js/jsm/loaders/RGBELoader.js';

import Stats from '../js/jsm/libs/stats.module.js';

console.log(Stats);



let stats = new Stats();


//场景相机和渲染器  摄像机用的内置的
let camera, scene, renderer
let mix;
let aniat, timeoutid;








const clock = new THREE.Clock();




function init() {

    const container = document.createElement('div');


    // container.style.width = "90%"
    // container.style.height = "50%"
    // container.style.margin = "0 auto"


    run.append(container)

    // document.body.appendChild(container);

    // camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    // camera = new THREE.PerspectiveCamera(45, 650 / 400, 1, 2000);

    // camera.position.z = 50;
    // camera.position.set(100, 1500, 30)

    // scene

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);




    let ambient = new THREE.AmbientLight(0x186e91);
    scene.add(ambient);





    //

    renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.logarithmicDepthBuffer = true;


    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setSize(250, 250);




    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    renderer.domElement.style.margin = "0 auto"

    container.appendChild(renderer.domElement);

    container.appendChild(stats.domElement);


    // <img src="../mod/医院特效.gltf" alt="">

    let msg = document.querySelector(".msg")
    console.log(msg)
    let msging = document.querySelector("#msging")


    let clip;
    const loader = new GLTFLoader().setPath('../mod/');
    loader.load('医院特效.gltf', function (gltf) {



        // ingltf = gltf
        console.log(gltf);

        clip = gltf.animations[0];

        scene.add(gltf.scene);


        // 添加平行光
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
        directionalLight.position.set(100,100, 100).normalize();
        scene.add(directionalLight);




        // receiveShadow
        camera = gltf.cameras[0]





        mix = new THREE.AnimationMixer(camera)
        console.log(mix);
        aniat = mix.clipAction(gltf.animations[0])
        // 播放一次动画
        aniat.setDuration(30).setLoop(THREE.LoopOnce)
        aniat.clampWhenFinished = true





        // 开始动画

        // console.log(gltf.scene.children[0].children[0])

        let rootbutton = document.querySelectorAll(".select")

        console.log(rootbutton[0])

        // rootbutton[0].appendChild()

        let btn = ""

        btn+="" +
            "<h2>选择楼层</h2>"

        for (let i = 0; i <3; i++) {
                // console.log(gltf.scene.children[i].name)
            btn+=`<div><div><button data-id = "${i}">${gltf.scene.children[i].name}</button></div>`
            for (let j = 0; j < gltf.scene.children[i].children.length; j++) {
                btn+=`<button data-id = "${i}-${j}">${gltf.scene.children[i].children[j].name}</button>`
                // console.log(gltf.scene.children[i].children[j].name)
            }
            btn+="</div>"

        }


        btn+=""
        rootbutton[0].innerHTML = btn


        let NewInBtn = document.querySelectorAll(".select>div>div>button")
        let NewBtn = document.querySelectorAll(".select>div>button")

        for (let i = 0; i < NewInBtn.length; i++) {
            NewInBtn[i].addEventListener("click", function () {
                // for (let j = 0; j < 3; j++) {
                //     gltf.scene.children[j].visible = false
                // }
                // // gltf.scene.children[i].visible = true
                //

                disshowall();
                showOne(i)
                aniat.time = i+2;
            timeout();

            })
        }


        // select[2].onclick = function () {
        //     for (let index = 0; index < gltf.scene.children[2].children.length; index++) {
        //         gltf.scene.children[2].children[index].visible = true;
        //     }
        //     aniat.time = 4;
        //     timeout();
        // }

        function disshowall() {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < gltf.scene.children[i].children.length; j++) {
                    gltf.scene.children[i].children[j].visible = false
                }
            }
        }
        function showOne(i) {
                for (let j = 0; j < gltf.scene.children[i].children.length; j++) {
                    gltf.scene.children[i].children[j].visible = true
                }
        }

        for (let i = 0; i < NewBtn.length; i++) {


            NewBtn[i].addEventListener("click", function () {
                console.log(123)

                let selNum =  NewBtn[i].getAttribute("data-id")
                let inSelNum = selNum.split("-")
                let num1 = Number(inSelNum[0]);
                let num2 = Number(inSelNum[1])
                disshowall();
                gltf.scene.children[num1].children[num2].visible = true
                // gltf.scene.children[i].children[j].visible = false



                // ifbtn.substring(0,2)
                // console.log(ifbtn.substring(0,1))
                // btnfn(ifbtn.substring(0,1))
            })
            //根据对应按钮展示对应楼层里面的房间


            // let inSelNum = selNum.split("-")

            // disshowall();

            // NewBtn[i].addEventListener("click", function () {
            //     for (let j = 0; j < gltf.scene.children[i].children.length; j++) {
            //         gltf.scene.children[i].children[j].visible = false;
            //     }
            //     let ifbtn =  NewBtn[i].innerText
            //     // ifbtn.substring(0,2)
            //     console.log(ifbtn.substring(0,2))
            //     // console.log(ifbtn)
            //     // if(){
            //     //
            //     // }else if(){
            //     //
            //     // }else if{
            //     //
            //     // }
            //     // gltf.scene.children[i].visible = true
            // })
        }




        // console.log(rootbutton[0].children[0].childNodes[1].childNodes.length)
        // for (let i = 0; i < rootbutton[0].children[0].childNodes[1].childNodes.length; i++) {
        //     let btn = rootbutton[0].children[0].childNodes[1].childNodes[i]
        //     console.log(rootbutton[0].children[0].childNodes[1].childNodes[i])
        //     // if(){}
        //
        //     btn.addEventListener("click", function (e) {
        //         console.log(e)
        //         console.log(e.target.nodeName==="BUTTON")
        //     })
        // }






        msg.style.display = "none"


        aniat.play()





        // for (let i = 0; i <2; i++) {
        //     for (let j = 0; j <gltf.scene.children[i].length; j++) {
        //         console.log(gltf.scene.children[i])
        //     }
        // }

        // let rootbutton = document.querySelectorAll(".select")








        // NO11.onclick  = function (params) {
        //     console.log(gltf.scene.children[0].children.length);
        //     for (let index = 0; index < gltf.scene.children[0].children.length; index++) {
        //         gltf.scene.children[0].children[index].visible = false;

        //     }
        //     gltf.scene.children[0].children[0].visible = true;

        // }

        // let Nobtn = document.querySelectorAll(".select>div>button")

        // console.log(Nobtn);



        // for (let i = 0; i < Nobtn.length; i++) {
        //     Nobtn[i].onclick = function (params) {
        //         console.log(i);
        //         for (let index = 0; index < gltf.scene.children.length; index++) {
        //             for (let j = 0; j < gltf.scene.children[index].children.length; i++) {
        //                 gltf.scene.children[index].children[j].visible = false;   
        //             }
        //         }
        //         if(i<=7){
        //             gltf.scene.children[0].children[i].visible = true;                        
        //             console.log("一号楼");
        //         }else if(i< i +7){
        //             gltf.scene.children[1].children[i].visible = true;                        
        //             console.log("二号楼");
        
        //         }else{
        //             gltf.scene.children[2].children[i].visible = true;                        
        //             console.log("三号楼");
        //         }
        
        
        //         console.log(gltf.scene.children[0].children.length);
        //         for (let index = 0; index < gltf.scene.children[0].children.length; index++) {
        //             gltf.scene.children[0].children[index].visible = false;
        
        //         }



        //         if (i < 6) {
        //             console.log("----" + 1);

        //             let a = i;
        //             for (let index = 0; index < gltf.scene.children[0].children.length; index++) {
        //                 gltf.scene.children[0].children[index].visible = false;
        //             }
        //             gltf.scene.children[0].children[a].visible = true;

        //         } else if (i < 12) {
        //             console.log("----" + 2);

        //             let a = i - 6;
        //             for (let index = 0; index < gltf.scene.children[1].children.length; index++) {
        //                 gltf.scene.children[1].children[index].visible = false;
        //             }
        //             gltf.scene.children[1].children[a].visible = true;

        //         } else if (i < i + 12) {
        //             let a = i - 12;

        //             console.log("----" + 3);

        //             for (let index = 0; index < gltf.scene.children[2].children.length; index++) {
        //                 gltf.scene.children[2].children[index].visible = false;
        //             }
        //             gltf.scene.children[2].children[a].visible = true;
        //         }
        //     }
        // }







        // let select = document.querySelectorAll(".select>div>div>button")

        











        function timeout(params) {
            if (timeoutid) {
                clearTimeout(timeoutid)
            }
            timeoutid = setTimeout(() => {
                aniat.halt(0.5)
            }, 200)
        }

        // select[0].onclick = function () {
        //     console.log(132);
        //     for (let index = 0; index < gltf.scene.children[0].children.length; index++) {
        //         gltf.scene.children[0].children[index].visible = true;

        //     }
        //     aniat.time = 2;
        //     aniat.play();
        //     timeout();
        // }
        // select[1].onclick = function () {
        //     for (let index = 0; index < gltf.scene.children[1].children.length; index++) {
        //         gltf.scene.children[1].children[index].visible = true;
        //     }

        //     aniat.time = 3;
        //     timeout();
        // }
        // select[2].onclick = function () {
        //     for (let index = 0; index < gltf.scene.children[2].children.length; index++) {
        //         gltf.scene.children[2].children[index].visible = true;
        //     }
        //     aniat.time = 4;
        //     timeout();
        // }










        render();

        animate();

    }, function name(e) {
        // console.log();
        // console.log(e);
        let num = e.loaded / e.total * 100;
        console.log("模型进度"+num.toFixed(2) + "%");
        msging.innerHTML = num.toFixed(2) + "%"
    });


    window.addEventListener("mousewheel", (e) => {

        // console.log(aniat);
        // console.log(e);
        // aniat.play();

        let timeScale = e.deltaY > 0 ? 1 : -1;
        // console.log("动画事件");
        // console.log(aniat.getEffectiveTimeScale());
        // console.log(timeScale);
        // aniat.AnimationAction.setEffectiveTimeScale(timeScale)
        // aniat.AnimationAction.paused = false;
        // aniat.AnimationAction.play();
        // setTimeout(() => {
        // aniat.AnimationAction.halt(0.5);


        // aniat.setEffectiveTimeScale(timeScale)
        aniat.setEffectiveTimeScale(timeScale)
        aniat.paused = false;
        aniat.play();


        if (timeoutid) {
            clearTimeout(timeoutid)
        }
        timeoutid = setTimeout(() => {
            aniat.halt(0.5)
        }, 300)

    })



















}
init()







//控制器
// const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', onWindowResize);
function onWindowResize() {

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    // renderer.domElement.style.width = "100%";
    // renderer.domElement.style.height = "50%";
    // camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();
    // renderer.setSize(window.innerWidth, window.innerHeight);

}


//




function animate() {
    requestAnimationFrame(animate);
    // mesh
    // mesh.rotation.x += 0.01;
    // console.log(ambient);

    // ambient.rotation.y += 0.01;

    // mesh.rotation.y += 0.01;
    // ambient.rotation.y +=0.01;
    render();


}
function render() {

    let delta = clock.getDelta()

    // console.log(clock.getDelta());

    mix && mix.update(delta)

    // helper.update( clock.getDelta() );
    // effect.render( scene, camera );
    renderer.render(scene, camera);

    //          FPS更新要放在渲染后
    stats.update();

    // effect.render(scene, camera);
    // renderer.render()
}
// render();



// let threejs = document.querySelector("#run>div>canvas")
// threejs.style.height = "100%"
// console.log(threejs);


let settingList = document.querySelector(".settingList")
console.log(settingList)
let settingbtn = document.querySelector("#settingbtn")
console.log(settingbtn)
let showSettingList = false;
settingbtn.addEventListener("click",function (){
        console.log("run")
        if(showSettingList){
            settingList.style.display = "block"
            
        }else{
            settingList.style.display = "none"
        }
        showSettingList != showSettingList;
 
})

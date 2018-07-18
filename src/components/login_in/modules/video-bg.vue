<template>
    <div class="homepage-hero-module">
        <div class="video-container">
            <video id="bg-video" autoplay loop class="fillWidth" :src="PATH_TO_MP4" :poster="PATH_TO_JPEG">

            </video>
        </div>
    </div>
</template>

<script>
    export default {
        name: "video-bg",
        data() {
            return {
                PATH_TO_MP4: undefined,
                PATH_TO_JPEG: undefined,
                videoPath: [
                    {
                        video: '/src/assets/login/video-bg/for_wes/For_Wes.mp4',
                        poster: '/src/assets/login/video-bg/for_wes/For_Wes.jpg'
                    },
                    {
                        video: '/src/assets/login/video-bg/home_work/Home_work.mp4',
                        poster: '/src/assets/login/video-bg/home_work/Home_work.png'
                    },
                    {
                        video: '/src/assets/login/video-bg/push_the_buttons/Push-The-Buttons.mp4',
                        poster: '/src/assets/login/video-bg/push_the_buttons/Push-The-Buttons.jpg',

                    },
                    {
                        video: 'src/assets/login/video-bg/forest-lullaby/Forest-Lullaby.mp4',
                        poster: '/src/assets/login/video-bg/forest-lullaby/Forest-Lullaby.jpg'
                    },
                    {
                        video: 'src/assets/login/video-bg/sky-high/Sky-High.mp4',
                        poster: 'src/assets/login/video-bg/sky-high/Sky-High.jpg'
                    },
                    {
                        video: 'src/assets/login/video-bg/typing/Typing.mp4',
                        poster: 'src/assets/login/video-bg/typing/Typing.jpg',

                    }
                ]
            }
        },
        methods: {
            getRandomInt(min, max) {
                return parseInt(Math.random() * (max - min + 1) + min, 10);
            }
        },
        mounted() {
            var index = this.getRandomInt(0, this.videoPath.length - 1);
            this.PATH_TO_MP4 = this.videoPath[index].video;
            this.PATH_TO_JPEG = this.videoPath[index].poster;

            setTimeout(()=>{
                $('#bg-video').get(0).play();
            },500)


        }
    }


</script>

<style>
    .homepage-hero-module {
        overflow: hidden;
        background: #0f0f10;
        height: 100%;
    }

    .video-container {
        filter: blur(5px);
        transform: scale(1.009);
    }

    .fillWidth {
        width: 100%;
        height: 99vh !important;
        object-fit: fill;
    }
</style>

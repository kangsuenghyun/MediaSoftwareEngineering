//1. 서버에서 해주는 일 = item 생성해주기(generator로)
//2. 클라에서 충돌반정 event를 받아서 해당 event에 대한 event를 emit해주기

    socket.on('item_detect', function(){
        io.sockets.emit('coffee_effect', {coffee : true});
    })
    socket.on('hotsix_detect', function(){
        io.sockets.emit('hotsix_effcet',{hotsix : true});
    })


    const itemRadius=20;

    function itemLeftSideGenerator(){
        if(balls.length){
            var randomStartY = Math.floor(Math.random() * 768)
            var randomDestinationY = Math.floor(Math.random() * 768)
            io.sockets.emit('item_generator', {
                wall: 0,
                startingX: itemRadius,
                startingY: randomStartY,
                destinationX: canvasWidth+itemRadius,
                destinationY: randomDestinationY
            })
        }
    }

    function itemRightSideGenerator(){
        if(balls.length){
            var randomStartY = Math.floor(Math.random() * 768)
            var randomDestinationY = Math.floor(Math.random() * 768)
            io.sockets.emit('item_generator', {
                wall: 1,
                startingX: canvasWidth+itemRadius,
                startingY: randomStartY,
                destinationX: itemRadius,
                destinationY: randomDestinationY
            })
        }
    }

    function itemUpSideGenerator(){
        if(balls.length){
            var randomStartX = Math.floor(Math.random() * 1024)
            var randomDestinationX = Math.floor(Math.random() * 1024)
            io.sockets.emit('item_generator', {
                wall: 2,
                startingX: randomStartX,
                startingY: itemRadius,
                destinationX: randomDestinationX,
                destinationY: canvasHeight+itemRadius
            })
        }
    }

    function itemDownSideGenerator(){
        if(balls.length){
            var randomStartX = Math.floor(Math.random() * 1024)
            var randomDestinationX = Math.floor(Math.random() * 1024)
            io.sockets.emit('item_generator', {
                wall: 3,
                startingX: randomStartX,
                startingY: canvasHeight+itemRadius,
                destinationX: randomDestinationX,
                destinationY: itemRadius
            })
        }
    }

    function itemGenerator(){
        k = Math.floor(Math.random)*4
        if(k == 0){
            itemLeftSideGenerator();
        }
        else if(k == 1){
            itemRightSideGenerator();
        }
        else if(k==2){
            itemUpSideGenerator();
        }
        else{
            itemDownSideGenerator();
        }
    }


    function stageFail(){
        var isFail = true;
        for(let i = 0 ; i < balls.length ; i++){
            if(balls[i].state == 1){
                isFail = false;
            }
        }
        return isFail;
    }
})
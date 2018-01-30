$.keyframe.define({
    name:'expand-height',
    from:{'height':'0px',opacity:'0'},
    to:{'height':'200px',opacity:'1'}
});

$.keyframe.define({
    name:'retract-height',
    from:{'height':'200px',opacity:'1'},
    to:{'height':'0px',opacity:'0'}
});

$.keyframe.define({
    name:'fade-in',
    from:{opacity:'0'},
    to:{opacity:'1'}
});

$.keyframe.define({
    name:'new-panel',
    from:{transform:'translateY(50px) translateZ(100px)',opacity:'0'},
    to:{transform:'translateY(0px) translateZ(0px)',opacity:'1'}
});

$.keyframe.define({
    name:'new-level',
    from:{transform:'rotateX(-80deg) translateZ(0px)',opacity:'0'},
    to:{transform:'rotateX(-90deg) translateZ(30px)',opacity:'1'}
});

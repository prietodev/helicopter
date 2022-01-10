
// Vertex shader for texture drawing
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Normal;\n' +
    'attribute vec2 a_TexCoord;\n' +
    'uniform mat4 u_MvpMatrix;\n' +
    'uniform mat4 u_NormalMatrix;\n' +
    'varying float v_NdotL;\n' +
    'varying vec2 v_TexCoord;\n' +
    'void main() {\n' +
    '   vec3 lightDirection = vec3(1.0, 1.0, 1.0);\n' + // Light direction(World coordinate)
    '   gl_Position = u_MvpMatrix * a_Position;\n' +
    '   vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
    '   v_NdotL = max(dot(normal, lightDirection), 0.0);\n' +
    '   v_TexCoord = a_TexCoord;\n' +
    '}\n';

// Fragment shader for texture drawing
var FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif\n' +
    'uniform sampler2D u_Sampler;\n' +
    'varying vec2 v_TexCoord;\n' +
    'varying float v_NdotL;\n' +
    'void main() {\n' +
    '   vec4 color = texture2D(u_Sampler, v_TexCoord);\n' +
    '   gl_FragColor = vec4(color.rgb * v_NdotL, color.a);\n' +
    '}\n';

// Vertex shader for texture drawing
var MOVING_VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Normal;\n' +
    'attribute vec2 a_TexCoord;\n' +
    'uniform mat4 u_MvpMatrix;\n' +
    'uniform mat4 u_NormalMatrix;\n' +
    'varying float v_NdotL;\n' +
    'varying vec2 v_TexCoord;\n' +
    'void main() {\n' +
    '   vec3 lightDirection = vec3(1.0, -0.8, 1.0);\n' + // Light direction(World coordinate)
    '   gl_Position = u_MvpMatrix * a_Position;\n' +
    '   vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
    '   v_NdotL = max(dot(normal, lightDirection), 0.0);\n' +
    '   v_TexCoord = a_TexCoord;\n' +
    '}\n';

// Fragment shader for texture drawing
var MOVING_FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif\n' +
    'uniform sampler2D u_Sampler;\n' +
    'varying vec2 v_TexCoord;\n' +
    'varying float v_NdotL;\n' +
    'void main() {\n' +
    '  vec4 color = texture2D(u_Sampler, v_TexCoord);\n' +
    '  gl_FragColor = vec4(color.rgb * v_NdotL, color.a);\n' +
    '}\n';

    // Vertex shader for texture drawing
var MOVING_VSHADER_SOURCE_TWO =
'attribute vec4 a_Position;\n' +
'attribute vec4 a_Normal;\n' +
'attribute vec2 a_TexCoord;\n' +
'uniform mat4 u_MvpMatrix;\n' +
'uniform mat4 u_NormalMatrix;\n' +
'varying float v_NdotL;\n' +
'varying vec2 v_TexCoord;\n' +
'void main() {\n' +
'   vec3 lightDirection = vec3(1.0, -0.8, 1.0);\n' + // Light direction(World coordinate)
'   gl_Position = u_MvpMatrix * a_Position;\n' +
'   vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
'   v_NdotL = max(dot(normal, lightDirection), 0.0);\n' +
'   v_TexCoord = a_TexCoord;\n' +
'}\n';

// Fragment shader for texture drawing
var MOVING_FSHADER_SOURCE_TWO =
'#ifdef GL_ES\n' +
'precision mediump float;\n' +
'#endif\n' +
'uniform sampler2D u_Sampler;\n' +
'varying vec2 v_TexCoord;\n' +
'varying float v_NdotL;\n' +
'void main() {\n' +
'  vec4 color = texture2D(u_Sampler, v_TexCoord);\n' +
'  gl_FragColor = vec4(color.rgb * v_NdotL, color.a);\n' +
'}\n';

function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    var program = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    if (!program) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // Initialize shaders
    var moving_program = createProgram(gl, MOVING_VSHADER_SOURCE, MOVING_FSHADER_SOURCE);
    if (!program) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // Initialize shaders
    var moving_program_two = createProgram(gl, MOVING_VSHADER_SOURCE_TWO, MOVING_FSHADER_SOURCE_TWO);
    if (!program) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // Get storage locations of attribute and uniform variables in program object for texture drawing
    program.a_Position = gl.getAttribLocation(program, 'a_Position');
    program.a_Normal = gl.getAttribLocation(program, 'a_Normal');
    program.a_TexCoord = gl.getAttribLocation(program, 'a_TexCoord');
    program.u_MvpMatrix = gl.getUniformLocation(program, 'u_MvpMatrix');
    program.u_NormalMatrix = gl.getUniformLocation(program, 'u_NormalMatrix');
    program.u_Sampler = gl.getUniformLocation(program, 'u_Sampler');
    
    // Get storage locations of attribute and uniform variables in program object for texture drawing
    moving_program.a_Position = gl.getAttribLocation(moving_program, 'a_Position');
    moving_program.a_Normal = gl.getAttribLocation(moving_program, 'a_Normal');
    moving_program.a_TexCoord = gl.getAttribLocation(moving_program, 'a_TexCoord');
    moving_program.u_MvpMatrix = gl.getUniformLocation(moving_program, 'u_MvpMatrix');
    moving_program.u_NormalMatrix = gl.getUniformLocation(moving_program, 'u_NormalMatrix');
    moving_program.u_Sampler = gl.getUniformLocation(moving_program, 'u_Sampler');

    // Get storage locations of attribute and uniform variables in program object for texture drawing
    moving_program_two.a_Position = gl.getAttribLocation(moving_program_two, 'a_Position');
    moving_program_two.a_Normal = gl.getAttribLocation(moving_program_two, 'a_Normal');
    moving_program_two.a_TexCoord = gl.getAttribLocation(moving_program_two, 'a_TexCoord');
    moving_program_two.u_MvpMatrix = gl.getUniformLocation(moving_program_two, 'u_MvpMatrix');
    moving_program_two.u_NormalMatrix = gl.getUniformLocation(moving_program_two, 'u_NormalMatrix');
    moving_program_two.u_Sampler = gl.getUniformLocation(moving_program_two, 'u_Sampler');

    if (program.a_Position < 0 || program.a_Normal < 0 || program.a_TexCoord < 0 ||
        !program.u_MvpMatrix || !program.u_NormalMatrix || !program.u_Sampler ||
        moving_program.a_Position < 0 || moving_program.a_Normal < 0 ||
        moving_program.a_TexCoord < 0 || !moving_program.u_MvpMatrix ||
        !moving_program.u_NormalMatrix || !moving_program.u_Sampler||
        moving_program_two.a_Position < 0 || moving_program_two.a_Normal < 0 ||
        moving_program_two.a_TexCoord < 0 || !moving_program_two.u_MvpMatrix ||
        !moving_program_two.u_NormalMatrix || !moving_program_two.u_Sampler) {
        console.log('Failed to get the storage location of attribute or uniform variable');
        return;
    }

    // Set the vertex information
    var vertices = initVertexBuffers(gl);
    if (!vertices) {
        console.log('Failed to set the vertex information');
        return;
    }

    var moving_vertices = initMovingVertexBuffers(gl);
    if (!moving_vertices) {
        console.log('Failed to set the moving vertices information');
        return;
    }

    var moving_vertices_two = initMovingVertexBuffers2(gl);
    if (!moving_vertices_two) {
        console.log('Failed to set the moving vertices information');
        return;
    }

    // Set texture
    var texture = initTextures(gl, program);
    if (!texture) {
        console.log('Failed to intialize the texture.');
        return;
    }

    var moving_texture = initTextures(gl, moving_program);
    if (!moving_texture) {
        console.log('Failed to intialize the texture.');
        return;
    }

    var moving_texture_two = initTextures(gl, moving_program_two);
    if (!moving_texture_two) {
        console.log('Failed to intialize the texture.');
        return;
    }

    // Set the clear color and enable the depth test
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Calculate the view projection matrix
    var viewProjMatrix = new Matrix4();
    viewProjMatrix.setPerspective(15, 1, 1, 20);
    viewProjMatrix.lookAt(5, 3, 7, 0, 0, 0, 0, 1, 0);

    // Start drawing
    var currentAngle = 0.0; // Current rotation angle (degrees)
        var tick = function () {
        currentAngle = animate(currentAngle);  // Update current rotation angle

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear color and depth buffers

        // Draw non moving parts
        get_tex(gl, program, vertices, texture, 0, viewProjMatrix, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0);
        
        // Draw main rotor
        get_tex(gl, moving_program, moving_vertices, moving_texture, currentAngle, viewProjMatrix, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0);

        // Draw back rotor
        get_tex(gl, moving_program_two, moving_vertices_two, moving_texture_two, currentAngle, viewProjMatrix, 1.0, 0.0, 0.0, 0.1, -0.55,-0.8);

        window.requestAnimationFrame(tick, canvas);
    };
    tick();
}

function initVertexBuffers(gl) {

    var vertices = new Float32Array([   // Vertex coordinates
         -1.2,  1.2,  1.2,  //v0
         -1.2,  1.2, -1.2,  //v1          STAGE
         -1.2, -1.2, -1.2,  //v2       v1----- v4
         -1.2, -1.2,  1.2,  //v3      /|       |
         -1.2,  1.2, -1.2,  //v4     v0|       |
          1.2,  1.2, -1.2,  //v5     | |v2-----|v5
          1.2, -1.2, -1.2,  //v6     |/       /
         -1.2, -1.2, -1.2,  //v7     v3------v6
         -1.2, -1.2, -1.2,  //v8
          1.2, -1.2, -1.2,  //v9
          1.2, -1.2,  1.2,  //v10
         -1.2, -1.2,  1.2,  //v11

        -0.25,-0.85,  0.0,  //v12    BOTTOM OF HELICAB (FRONT)
        -0.15,-0.85,  0.0,  //v13    ________________
         0.15,-0.85,  0.0,  //v14    |v12|v13   |v14|v15
         0.25,-0.85,  0.0,  //v15    |   |      |   |
        -0.25,-0.85, 0.25,  //v16    |v16|v17   |v18|v19
        -0.15,-0.85, 0.25,  //v17     \  |      |  /
         0.15,-0.85, 0.25,  //v18      \ |______| /
         0.25,-0.85, 0.25,  //v19       v20     v21
        -0.15,-0.85,  0.5,  //v20
         0.15,-0.85,  0.5,  //v21

        -0.25,-0.85, -0.0,  //v22       BOTTOM OF HELICAB (BACK)
        -0.15,-0.85, -0.0,  //v23
         0.15,-0.85, -0.0,  //v24         
         0.25,-0.85, -0.0,  //v25         v30-----v31
        -0.25,-0.85,-0.15,  //v26       /  |      |  \
        -0.15,-0.85,-0.15,  //v27      |v26|v27   |v28|v29
         0.15,-0.85,-0.15,  //v28      |   |      |   |
         0.25,-0.85,-0.15,  //v29      |v22|v23   |v24|v25
        -0.15,-0.85, -0.3,  //v30      ----------------
         0.15,-0.85, -0.3,  //v31

        -0.25,-0.85, 0.25,  //v32      TOP OF HELICAB (FRONT)
        -0.15, -0.4, 0.25,  //v33
         0.15, -0.4, 0.25,  //v34     v32__v33___v34_v35
         0.25,-0.85, 0.25,  //v35        \ |      | /
        -0.15,-0.85,  0.5,  //v36         \|______|/
         0.15,-0.85,  0.5,  //v37         v36    v37

        -0.15,-0.85, -0.3,  //v38      TOP OF HELICAB (BACK)
         0.15,-0.85, -0.3,  //v39        v38_________v39
        -0.25,-0.85,-0.15,  //v40          /|       |\
        -0.15, -0.4,-0.15,  //v41         /_|_______|_\
         0.15, -0.4,-0.15,  //v42      v40| |v41 v42| |v43
         0.25,-0.85,-0.15,  //v43         | |       | |
        -0.25,-0.85, 0.25,  //v44         | |       | |
        -0.15, -0.4, 0.25,  //v45       v44 v45   v46 v47
         0.15, -0.4, 0.25,  //v46
         0.25,-0.85, 0.25,  //v47

        //  -0.1, -0.5, -0.2,  //v0           TAIL BOOM
        //   0.1, -0.5, -0.2,  //v1         v4_______v5
        //   0.1, -0.7, -0.2,  //v2         /|     /|
        //  -0.1, -0.7, -0.2,  //v3        / |v7__/_|v6
        // -0.05,-0.55,-0.95,  //v4     v0/__/_v1/ /
        //  0.05,-0.55,-0.95,  //v5      | /    | /
        //  0.05,-0.65,-0.95,  //v6      |/_____|/
        // -0.05,-0.65,-0.95,  //v7    v3      v2

        //right 1,5,6,2
          0.1, -0.5, -0.2,  //v48
         0.05,-0.55,-0.95,  //v49
         0.05,-0.65,-0.95,  //v50
          0.1, -0.7, -0.2,  //v51
        //up 4,5,1,0
        -0.05,-0.55,-0.95,  //v52
         0.05,-0.55,-0.95,  //v53
          0.1, -0.5, -0.2,  //v54
         -0.1, -0.5, -0.2,  //v55
        //left 4,0,3,7
        -0.05,-0.55,-0.95,  //v56
         -0.1, -0.5, -0.2,  //v57
         -0.1, -0.7, -0.2,  //v58
        -0.05,-0.65,-0.95,  //v59
        //down 3,2,6,7
         -0.1, -0.7, -0.2,  //v60
          0.1, -0.7, -0.2,  //v61
         0.05,-0.65,-0.95,  //v62
        -0.05,-0.65,-0.95,  //v63
        //back 5,4,7,6
         0.05,-0.55,-0.95,  //v64
        -0.05,-0.55,-0.95,  //v65
        -0.05,-0.65,-0.95,  //v66
         0.05,-0.65,-0.95,  //v67


        // -0.02, -0.45, -0.8,  //v0       TOP RUDDER
        //  0.02, -0.45, -0.8,  //v1       v0 ______v4
        //  0.02, -0.52, -0.8,  //v2        / \v1_/_/v5
        // -0.02, -0.52, -0.8,  //v3     v3/_/_v7/ /
        // -0.02, -0.45, -0.9,  //v4      \ /____\/
        //  0.02, -0.45, -0.9,  //v5      v2      v6
        //  0.02, -0.55, -0.9,  //v6
        // -0.02, -0.55, -0.9,  //v7

        // right 1,5,6,2
         0.02, -0.45, -0.8,  //v68
         0.02, -0.45, -0.9,  //v69
         0.02, -0.55, -0.9,  //v70
         0.02, -0.52, -0.8,  //v71
        // top 4,5,1,0
        -0.02, -0.45, -0.9,  //v72
         0.02, -0.45, -0.9,  //v73
         0.02, -0.45, -0.8,  //v74
        -0.02, -0.45, -0.8,  //v75
        // left 4,0,3,7
        -0.02, -0.45, -0.9,  //v76
        -0.02, -0.45, -0.8,  //v77
        -0.02, -0.52, -0.8,  //v78
        -0.02, -0.55, -0.9,  //v79
        // back 5,4,7,6
         0.02, -0.45, -0.9,  //v80
        -0.02, -0.45, -0.9,  //v81
        -0.02, -0.55, -0.9,  //v82
         0.02, -0.55, -0.9,  //v83
        // front 0,1,2,3
        -0.02, -0.45, -0.8,  //v84
         0.02, -0.45, -0.8,  //v85
         0.02, -0.52, -0.8,  //v86
        -0.02, -0.52, -0.8,  //v87

        // -0.02, -0.65, -0.8,  //v0        BOTTOM RUDDER
        //  0.02, -0.65, -0.8,  //v1          v0 _____v4
        //  0.02, -0.72, -0.8,  //v2        v1 /_\_v5/\ 
        // -0.02, -0.72, -0.8,  //v3           \v3\__\_\ v7
        // -0.02, -0.65, -0.9,  //v4            \/ ___\/
        //  0.02, -0.65, -0.9,  //v5            v2    v6
        //  0.02, -0.75, -0.9,  //v6
        // -0.02, -0.75, -0.9,  //v7

        // right 1,5,6,2
         0.02, -0.65, -0.8,  //v88
         0.02, -0.65, -0.9,  //v89
         0.02, -0.75, -0.9,  //v90
         0.02, -0.72, -0.8,  //v91
        // bottom 7,6,2,3
        -0.02, -0.75, -0.9,  //v92
         0.02, -0.75, -0.9,  //v93
         0.02, -0.72, -0.8,  //v94
        -0.02, -0.72, -0.8,  //v95
        // left 4,6,3,7
        -0.02, -0.65, -0.9,  //v96
        -0.02, -0.65, -0.8,  //v97
        -0.02, -0.72, -0.8,  //v98
        -0.02, -0.75, -0.9,  //v99
        // back 5,4,7,6
         0.02, -0.65, -0.9,  //v100
        -0.02, -0.65, -0.9,  //v101
        -0.02, -0.75, -0.9,  //v102
         0.02, -0.75, -0.9,  //v103
        // front 0,1,2,3
        -0.02, -0.65, -0.8,  //v104
         0.02, -0.65, -0.8,  //v105
         0.02, -0.72, -0.8,  //v106
        -0.02, -0.72, -0.8,  //v107

        // -0.15, -0.9, 0.5,  //v0      far landing skid bar
        //  -0.1, -0.9, 0.5,  //v1                 v4___v5
        //  -0.1,-0.93, 0.5,  //v2               v7/|__/|v6
        // -0.15,-0.93, 0.5,  //v3                / / / /
        // -0.15, -0.9,-0.3,  //v4             v0/_v1/ /
        //  -0.1, -0.9,-0.3,  //v5               |/__|/
        //  -0.1,-0.93,-0.3,  //v6              v3   v2
        // -0.15,-0.93,-0.3,  //v7

        // front 0,1,2,3
        -0.15, -0.9, 0.5,  //v108
         -0.1, -0.9, 0.5,  //v109
         -0.1,-0.93, 0.5,  //v110
        -0.15,-0.93, 0.5,  //v111
        // right 1,5,6,2
         -0.1, -0.9, 0.5,  //v112
         -0.1, -0.9,-0.3,  //v113
         -0.1,-0.93,-0.3,  //v114
         -0.1,-0.93, 0.5,  //v115
        // up 4,5,1,0
        -0.15, -0.9,-0.3,  //v116
         -0.1, -0.9,-0.3,  //v117
         -0.1, -0.9, 0.5,  //v118
        -0.15, -0.9, 0.5,  //v119
        // left 4,0,3,7
        -0.15, -0.9,-0.3,  //v120
        -0.15, -0.9, 0.5,  //v121
        -0.15,-0.93, 0.5,  //v122
        -0.15,-0.93,-0.3,  //v123
        // down 7,6,2,3
        -0.15,-0.93,-0.3,  //v124
         -0.1,-0.93,-0.3,  //v125
         -0.1,-0.93, 0.5,  //v126
        -0.15,-0.93, 0.5,  //v127
        // back 4,5,6,7
        -0.15, -0.9,-0.3,  //v128
         -0.1, -0.9,-0.3,  //v129
         -0.1,-0.93,-0.3,  //v130
        -0.15,-0.93,-0.3,  //v131

        // 0.1, -0.9, 0.5,  //v0      close landing skid bar
        // 0.2, -0.9, 0.5,  //v1                 v4___v5
        // 0.2,-0.93, 0.5,  //v2               v7/|__/|v6
        // 0.1,-0.93, 0.5,  //v3                / / / /
        // 0.1, -0.9,-0.3,  //v4             v0/_v1/ /
        // 0.2, -0.9,-0.3,  //v5               |/__|/
        // 0.2,-0.93,-0.3,  //v6              v3   v2
        // 0.1,-0.93,-0.3,  //v7

        // front 0,1,2,3
          0.1, -0.9, 0.5,  //v132
         0.15, -0.9, 0.5,  //v133
         0.15,-0.93, 0.5,  //v134
          0.1,-0.93, 0.5,  //v135
        // right 1,5,6,2
         0.15, -0.9, 0.5,  //v136
         0.15, -0.9,-0.3,  //v137
         0.15,-0.93,-0.3,  //v138
         0.15,-0.93, 0.5,  //v139
        // up 4,5,1,0
          0.1, -0.9,-0.3,  //v140
         0.15, -0.9,-0.3,  //v141
         0.15, -0.9, 0.5,  //v142
          0.1, -0.9, 0.5,  //v143
        // left 4,0,3,7
          0.1, -0.9,-0.3,  //v144
          0.1, -0.9, 0.5,  //v145
          0.1,-0.93, 0.5,  //v146
          0.1,-0.93,-0.3,  //v147
        // down 7,6,2,3
          0.1,-0.93,-0.3,  //v148
         0.15,-0.93,-0.3,  //v149
         0.15,-0.93, 0.5,  //v150
          0.1,-0.93, 0.5,  //v151
        // back 4,5,6,7
          0.1, -0.9,-0.3,  //v152
         0.15, -0.9,-0.3,  //v153
         0.15,-0.93,-0.3,  //v154
          0.1,-0.93,-0.3,  //v155
    ]);  

    var normals = new Float32Array([   // Normal
         1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,     // v0-v1-v2-v3 left      // Background
         0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,     // v1-v4-v5-v2 back    
         0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,     // v2-v5-v6-v3 bottom

         0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,     // Bottom of helicab (front)
         0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,
                          0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   
         
                          0.0,-1.0, 0.0,   0.0,-1.0, 0.0,                      // Bottom of helicab (back)
         0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,
         0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,

         0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,     // Top of helicab (front)
                          0.0, 0.0, 1.0,   0.0, 0.0, 1.0,

         0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,     // Top of helicab (back)
         0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
                          0.0, 0.0, 1.0,   0.0, 0.0, 1.0,

         1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,     // v0-v3-v4-v5 right      // Tail boom
         0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,     // v0-v5-v6-v1 up
         1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,     // v1-v6-v7-v2 left
         0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,     // v7-v4-v3-v2 down
         0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,     // v4-v7-v6-v5 back

         1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,     // v0-v3-v4-v5 right     //  Top Rudder
         0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,     // v0-v5-v6-v1 up
         1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,     // v1-v6-v7-v2 left
         0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,     // v4-v7-v6-v5 back
         0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,     // v0-v1-v2-v3 front

         1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,     // v0-v3-v4-v5 right     //  Bottom Rudder
         0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,     // v0-v5-v6-v1 down
         1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,     // v1-v6-v7-v2 left
         0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,     // v4-v7-v6-v5 back
         0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,     // v0-v1-v2-v3 front

         0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,     // v0-v1-v2-v3 front     // far landing skid bar
         1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,     // v0-v3-v4-v5 right
         0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,     // v0-v5-v6-v1 up
        -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,     // v1-v6-v7-v2 left
         0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,     // v7-v4-v3-v2 down
         0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,     // v4-v7-v6-v5 back   

         0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,     // v0-v1-v2-v3 front     // close landing skid bar
         1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,     // v0-v3-v4-v5 right
         0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,     // v0-v5-v6-v1 up
        -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,     // v1-v6-v7-v2 left
         0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,     // v7-v4-v3-v2 down
         0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,     // v4-v7-v6-v5 back   


    ]);

    var texCoords = new Float32Array([   // Texture coordinates
          0.0, 0.0,  0.25,  0.0,   0.25, 0.25,   0.0, 0.25,    // left wall
         0.25, 0.0,   0.5,  0.0,    0.5, 0.25,  0.25, 0.25,    // back wall
          0.5, 0.0,   1.0,  0.0,    1.0,  0.5,   0.5,  0.5,    // floor
 
          0.0, 0.5,   0.1,  0.5,    0.4,  0.5,   0.5,  0.5,    // bottom of helicab (front)
          0.0, 0.6,   0.1,  0.6,    0.4,  0.6,   0.5,  0.6,
                      0.1,  0.7,    0.4,  0.7,    
           
                      0.1,  0.7,    0.4,  0.7,                 // bottom of helicab (back)
          0.0, 0.6,   0.1,  0.6,    0.4,  0.6,   0.5,  0.6,
          0.0, 0.5,   0.1,  0.5,    0.4,  0.5,   0.5,  0.5,
 
        0.501, 0.76, 0.65, 0.55,   0.85, 0.55, 0.999, 0.76,    // top of helicab (front)
                      0.6, 0.79,    0.9, 0.79,

        
                       0.25,  0.5,    0.25,  0.5,              // top of helicab(back)
         0.25,  0.6,   0.25,  0.5,    0.25,  0.5, 0.25,  0.6,
         0.25, 0.79, 0.3125, 0.79,  0.4375, 0.79,  0.5, 0.79,

          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,   // Tail boom
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,

          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,   // Top Rudder
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,

          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,   // Bottom Rudder
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,   // far landing skid bar
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,

          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,   // close landing skid bar
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
          0.0,  0.5,    0.5,  0.5,     0.5,  0.79,  0.0,  0.79,
         
        ]);

    var indices = new Uint8Array([        // Indices of the vertices
         0, 1, 2,   0, 2, 3,    // left
         4, 5, 6,   4, 6, 7,    // back
         8, 9,10,   8,10,11,    // bottom

        12,13,17,  12,17,16,    // bottom of helicab(front)
        13,21,20,  13,14,21,
        14,15,19,  14,19,18,
        16,17,20,  18,19,21,

        22,26,23,  26,27,23,    // bottom of helicab(back)
        23,30,24,  30,31,24,
        28,25,24,  28,29,25,
        30,27,26,  31,28,29,

        32,33,36,  33,37,36,    // top of helicab(front)
        33,34,37,  34,35,37,

        38,41,40,  38,42,41,    // top of helicab(back)
        38,39,42,  39,43,42,
        40,45,44,  40,41,45,
        41,46,45,  41,42,46,
        42,47,46,  42,43,47,

        48,49,50,  48,50,51,    // tail boom
        52,53,54,  52,54,55,
        56,57,58,  56,58,59,
        60,61,62,  60,62,63,
        64,65,66,  64,66,67,

        68,69,70,  68,70,71,    // top rudder
        72,73,74,  72,74,75,
        76,77,78,  76,78,79,
        80,81,82,  80,82,83,
        84,85,86,  84,86,87,

        88,89,90,  88,90,91,        // bottom rudder
        92,93,94,  92,94,95,
        96,97,98,  96,98,99,
        100,101,102,  100,102,103,
        104,105,106,  104,106,107,

        108,109,110,  108,110,111,   // far landing skid bar
        112,113,114,  112,114,115,
        116,117,118,  116,118,119,
        120,121,122,  120,122,123,
        124,125,126,  124,126,127,
        128,129,130,  128,130,131,

        132,133,134,  132,134,135,  // close landing skid bar
        136,137,138,  136,138,139,
        140,141,142,  140,142,143,
        144,145,146,  144,146,147,
        148,149,150,  148,150,151,
        152,153,154,  152,154,155,

    ]);

    var o = new Object(); // Utilize Object to to return multiple buffer objects together
    

    // Write vertex information to buffer object
    o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
    o.normalBuffer = initArrayBufferForLaterUse(gl, normals, 3, gl.FLOAT);
    o.texCoordBuffer = initArrayBufferForLaterUse(gl, texCoords, 2, gl.FLOAT);
    o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);

    if (!o.vertexBuffer || !o.normalBuffer || !o.texCoordBuffer || !o.indexBuffer) return null;

    o.numIndices = indices.length;

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return o;
}

function initMovingVertexBuffers(gl) {
    // Create a cube
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3

    var vertices = new Float32Array([   // Vertex coordinates
         0.5, -0.405,  0.05,   -0.5, -0.405,  0.05,   -0.5, -0.395,  0.05,   0.5, -0.395,  0.05, // v0-v1-v2-v3 front
         0.5, -0.405,  0.05,    0.5, -0.395,  0.05,    0.5, -0.395, -0.05,   0.5, -0.405, -0.05, // v0-v3-v4-v5 right
         0.5, -0.405,  0.05,    0.5, -0.405, -0.05,   -0.5, -0.405, -0.05,  -0.5, -0.405,  0.05, // v0-v5-v6-v1 up
        -0.5, -0.405,  0.05,   -0.5, -0.405, -0.05,   -0.5, -0.395, -0.05,  -0.5, -0.395,  0.05, // v1-v6-v7-v2 left
        -0.5, -0.395, -0.05,    0.5, -0.395, -0.05,    0.5, -0.395,  0.05,  -0.5, -0.395,  0.05, // v7-v4-v3-v2 down
         0.5, -0.395, -0.05,   -0.5, -0.395, -0.05,   -0.5, -0.405, -0.05,   0.5, -0.405, -0.05, // v4-v7-v6-v5 back
    ]);

    var normals = new Float32Array([   // Normal
         0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,     // v0-v1-v2-v3 front
         1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,     // v0-v3-v4-v5 right
         0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,     // v0-v5-v6-v1 up
        -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,     // v1-v6-v7-v2 left
         0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,     // v7-v4-v3-v2 down
         0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,     // v4-v7-v6-v5 back    
    ]);

    var texCoords = new Float32Array([   // Texture coordinates
         0.0, 0.8,   0.2, 0.8,    0.2, 1.0,   0.0, 1.0,
         0.0, 0.8,   0.2, 0.8,    0.2, 1.0,   0.0, 1.0,
         0.0, 0.8,   0.2, 0.8,    0.2, 1.0,   0.0, 1.0,
         0.0, 0.8,   0.2, 0.8,    0.2, 1.0,   0.0, 1.0,
         0.0, 0.8,   0.2, 0.8,    0.2, 1.0,   0.0, 1.0,
         0.0, 0.8,   0.2, 0.8,    0.2, 1.0,   0.0, 1.0,
    ]);

    var indices = new Uint8Array([        // Indices of the vertices
         0, 1, 2,   0, 2, 3,    // front
         4, 5, 6,   4, 6, 7,    // right
         8, 9,10,   8,10,11,    // up
        12,13,14,  12,14,15,    // left
        16,17,18,  16,18,19,    // down
        20,21,22,  20,22,23,    // back
    ]);

    var o = new Object(); // Utilize Object to to return multiple buffer objects together
    

    // Write vertex information to buffer object
    o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
    o.normalBuffer = initArrayBufferForLaterUse(gl, normals, 3, gl.FLOAT);
    o.texCoordBuffer = initArrayBufferForLaterUse(gl, texCoords, 2, gl.FLOAT);
    o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);

    if (!o.vertexBuffer || !o.normalBuffer || !o.texCoordBuffer || !o.indexBuffer) return null;

    o.numIndices = indices.length;

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return o;
}

function initMovingVertexBuffers2(gl) {
    // Create a cube
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3
    //
    //  0.5,  0.005,  0.09, //v0
    // -0.5,  0.005,  0.09, //v1
    // -0.5, -0.005,  0.09, //v2
    //  0.5, -0.005,  0.09, //v3

    //  0.5,  0.005, -0.09, //v4
    //  0.5, -0.005, -0.09, //v5
    // -0.5, -0.005, -0.09, //v6
    // -0.5,  0.005, -0.09, //v7


    var vertices = new Float32Array([   // Vertex coordinates
         0.005, -0.02,  0.09,   -0.005, -0.02,  0.09,   -0.005,  0.02,  0.09,   0.005,  0.02,  0.09, // v0-v1-v2-v3 front
         0.005, -0.02,  0.09,    0.005,  0.02,  0.09,    0.005,  0.02, -0.09,   0.005, -0.02, -0.09, // v0-v3-v4-v5 right
         0.005, -0.02,  0.09,    0.005, -0.02, -0.09,   -0.005, -0.02, -0.09,  -0.005, -0.02,  0.09, // v0-v5-v6-v1 up
        -0.005, -0.02,  0.09,   -0.005, -0.02, -0.09,   -0.005,  0.02, -0.09,  -0.005,  0.02,  0.09, // v1-v6-v7-v2 left
        -0.005,  0.02, -0.09,    0.005,  0.02, -0.09,    0.005,  0.02,  0.09,  -0.005,  0.02,  0.09, // v7-v4-v3-v2 down
         0.005,  0.02, -0.09,   -0.005,  0.02, -0.09,   -0.005, -0.02, -0.09,   0.005, -0.02, -0.09, // v4-v7-v6-v5 back
    ]);

    var normals = new Float32Array([   // Normal
         0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,     // v0-v1-v2-v3 front
         1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,     // v0-v3-v4-v5 right
         0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,     // v0-v5-v6-v1 up
        -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,     // v1-v6-v7-v2 left
         0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,     // v7-v4-v3-v2 down
         0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,     // v4-v7-v6-v5 back    
    ]);

    var texCoords = new Float32Array([   // Texture coordinates
         0.0, 0.8,   0.2, 0.8,    0.2, 1.0,   0.0, 1.0,
         0.0, 0.8,   0.2, 0.8,    0.2, 1.0,   0.0, 1.0,
         0.0, 0.8,   0.2, 0.8,    0.2, 1.0,   0.0, 1.0,
         0.0, 0.8,   0.2, 0.8,    0.2, 1.0,   0.0, 1.0,
         0.0, 0.8,   0.2, 0.8,    0.2, 1.0,   0.0, 1.0,
         0.0, 0.8,   0.2, 0.8,    0.2, 1.0,   0.0, 1.0,
    ]);

    var indices = new Uint8Array([        // Indices of the vertices
         0, 1, 2,   0, 2, 3,    // front
         4, 5, 6,   4, 6, 7,    // right
         8, 9,10,   8,10,11,    // up
        12,13,14,  12,14,15,    // left
        16,17,18,  16,18,19,    // down
        20,21,22,  20,22,23,    // back
    ]);

    var o = new Object(); // Utilize Object to to return multiple buffer objects together
    

    // Write vertex information to buffer object
    o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
    o.normalBuffer = initArrayBufferForLaterUse(gl, normals, 3, gl.FLOAT);
    o.texCoordBuffer = initArrayBufferForLaterUse(gl, texCoords, 2, gl.FLOAT);
    o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);

    if (!o.vertexBuffer || !o.normalBuffer || !o.texCoordBuffer || !o.indexBuffer) return null;

    o.numIndices = indices.length;

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return o;
}

function initTextures(gl, program) {
    var texture = gl.createTexture();   // Create a texture object
    if (!texture) {
        console.log('Failed to create the texture object');
        return null;
    }

    var image = new Image();  // Create a image object
    if (!image) {
        console.log('Failed to create the image object');
        return null;
    }
    // Register the event handler to be called when image loading is completed
    image.onload = function () {
        // Write the image data to texture object
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);  // Flip the image Y coordinate
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        // Pass the texure unit 0 to u_Sampler
        gl.useProgram(program);
        gl.uniform1i(program.u_Sampler, 0);

        gl.bindTexture(gl.TEXTURE_2D, null); // Unbind texture
    };

    // Tell the browser to load an Image
    image.src = 'img/textures.jpg';

    return texture;
}

function get_tex(gl, program, o, texture, angle, viewProjMatrix, rx, ry, rz, tx, ty, tz) {
    gl.useProgram(program);   // Tell that this program object is used

    // Assign the buffer objects and enable the assignment
    initAttributeVariable(gl, program.a_Position, o.vertexBuffer);  // Vertex coordinates
    initAttributeVariable(gl, program.a_Normal, o.normalBuffer);    // Normal
    initAttributeVariable(gl, program.a_TexCoord, o.texCoordBuffer);// Texture coordinates
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.indexBuffer); // Bind indices

    // Bind texture object to texture unit 0
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    draw_shape(gl, program, o, angle, viewProjMatrix, rx, ry, rz, tx, ty, tz); // Draw
}

// Assign the buffer objects and enable the assignment
function initAttributeVariable(gl, a_attribute, buffer) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(a_attribute, buffer.num, buffer.type, false, 0, 0);
    gl.enableVertexAttribArray(a_attribute);
}

// Coordinate transformation matrix
var g_modelMatrix = new Matrix4();
var g_mvpMatrix = new Matrix4();
var g_normalMatrix = new Matrix4();

function draw_shape(gl, program, o, angle, viewProjMatrix, rx, ry, rz, tx, ty, tz) {
    // Calculate a model matrix
    g_modelMatrix.setTranslate(tx, ty, tz);
    g_modelMatrix.rotate(angle, rx, ry, rz);

    // Calculate transformation matrix for normals and pass it to u_NormalMatrix
    g_normalMatrix.setInverseOf(g_modelMatrix);
    g_normalMatrix.transpose();
    gl.uniformMatrix4fv(program.u_NormalMatrix, false, g_normalMatrix.elements);

    // Calculate model view projection matrix and pass it to u_MvpMatrix
    g_mvpMatrix.set(viewProjMatrix);
    g_mvpMatrix.multiply(g_modelMatrix);
    gl.uniformMatrix4fv(program.u_MvpMatrix, false, g_mvpMatrix.elements);

    gl.drawElements(gl.TRIANGLES, o.numIndices, o.indexBuffer.type, 0);   // Draw
}

function initArrayBufferForLaterUse(gl, data, num, type) {
    var buffer = gl.createBuffer();   // Create a buffer object
    if (!buffer) {
        console.log('Failed to create the buffer object');
        return null;
    }
    // Write date into the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    // Keep the information necessary to assign to the attribute variable later
    buffer.num = num;
    buffer.type = type;

    return buffer;
}

function initElementArrayBufferForLaterUse(gl, data, type) {
    var buffer = gl.createBuffer();    // Create a buffer object
    if (!buffer) {
        console.log('Failed to create the buffer object');
        return null;
    }
    // Write date into the buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

    buffer.type = type;

    return buffer;
}

var ANGLE_STEP = 200;   // The increments of rotation angle (degrees)

var last = Date.now(); // Last time that this function was called
function animate(angle) {
    var now = Date.now();   // Calculate the elapsed time
    var elapsed = now - last;
    last = now;
    // Update the current rotation angle (adjusted by the elapsed time)
    var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
    return newAngle % 360;
}

function up() {
    ANGLE_STEP += 10; 
  }
  
  function down() {
    ANGLE_STEP -= 10; 
  }
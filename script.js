const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl");
const status = document.getElementById("status");
const vertexCountDisplay = document.getElementById("vertexCount");

if (!gl) {
    status.textContent = "Fehler: WebGL wird nicht unterstützt.";
    throw new Error("WebGL konnte nicht initialisiert werden.");
}

//Beginn Aufgabe 3

// Vertex-Shader: bestimmt die Position der Vertices
const vertexShaderSource = `
    attribute vec2 aPosition;
    attribute vec4 aColor;
    varying vec4 vColor;

    void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
        vColor = aColor;
    }
`;

// Fragment-Shader: bestimmt die Farbe jedes Vertex
const fragmentShaderSource = `
    precision mediump float; 
    varying vec4 vColor;

    void main() {
        gl_FragColor = vColor;
    }
`;

//Ende Aufgabe 3

function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error("Shader-Fehler: " + error);
    }
    return shader;
}

try {
    const vertexShader = createShader(
        gl.VERTEX_SHADER,
        vertexShaderSource
    );

    const fragmentShader = createShader(
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
    );

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(
            "Programmfehler: " + gl.getProgramInfoLog(program)
        );
    }

    gl.useProgram(program);

    //Beginn Aufgabe 3

    // Positionen der Katze
    const vertices = new Float32Array([
        // Kopf und Ohren
        -0.65,  0.25,
        -0.62,  0.78,
        -0.22,  0.52,
        0.00,  0.42,
        0.22,  0.52,
        0.62,  0.78,
        0.65,  0.25,

        // Gesicht und Kinn
        -0.55, -0.10,
        -0.35, -0.40,
        0.00, -0.58,
        0.35, -0.40,
        0.55, -0.10,

        // Innere Ohren
        -0.55,  0.63,
        -0.48,  0.35,
        -0.32,  0.53,
        0.55,  0.63,
        0.48,  0.35,
        0.32,  0.53,

        // Linkes und rechtes Auge
        -0.32,  0.08,
        -0.25,  0.15,
        -0.18,  0.08,
        -0.25,  0.01,
        0.18,  0.08,
        0.25,  0.15,

        // Augenform
        0.32,  0.08,
        0.25,  0.01,
        0.25,  0.15,
        0.00,  0.00,

        // Nase
        -0.07, -0.20,
        0.07, -0.20,
        0.00, -0.28,

        // Mund
        -0.16, -0.34,
        0.16, -0.34,
        0.00, -0.38,

        // Schnurrhaare links
        -0.30, -0.23,
        -0.72, -0.12,
        -0.32, -0.25,

        -0.32, -0.28,
        -0.75, -0.28,
        -0.32, -0.30,

        -0.30, -0.33,
        -0.68, -0.45,
        -0.30, -0.35,

        // Schnurrhaare rechts
        0.30, -0.23,
        0.72, -0.12,
        0.32, -0.25,

        0.32, -0.28,
        0.75, -0.28,
        0.32, -0.30,

        0.30, -0.33,
        0.68, -0.45,
        0.30, -0.35
    ]);

    // Farbwerte RGBA: jeder Vertex bekommt eine Farbe
    const colors = new Float32Array([
        // Kopf und Ohren
        0.72, 0.48, 0.28, 1.0,
        0.88, 0.68, 0.43, 1.0,
        0.95, 0.79, 0.58, 1.0,
        0.98, 0.87, 0.70, 1.0,
        0.95, 0.79, 0.58, 1.0,
        0.88, 0.68, 0.43, 1.0,
        0.72, 0.48, 0.28, 1.0,

        // Gesicht und Kinn
        0.88, 0.68, 0.48, 1.0,
        0.98, 0.88, 0.73, 1.0,
        1.00, 0.92, 0.80, 1.0,
        0.98, 0.88, 0.73, 1.0,
        0.88, 0.68, 0.48, 1.0,

        // Innere Ohren
        0.85, 0.38, 0.40, 1.0,
        0.98, 0.65, 0.63, 1.0,
        0.92, 0.48, 0.48, 1.0,
        0.85, 0.38, 0.40, 1.0,
        0.98, 0.65, 0.63, 1.0,
        0.92, 0.48, 0.48, 1.0,

        // Augen
        0.20, 0.48, 0.24, 1.0,
        0.10, 0.30, 0.15, 1.0,
        0.20, 0.48, 0.24, 1.0,
        0.10, 0.30, 0.15, 1.0,
        0.20, 0.48, 0.24, 1.0,
        0.10, 0.30, 0.15, 1.0,

        0.20, 0.48, 0.24, 1.0,
        0.10, 0.30, 0.15, 1.0,
        0.20, 0.48, 0.24, 1.0,
        0.10, 0.30, 0.15, 1.0,

        // Nase
        0.95, 0.48, 0.52, 1.0,
        0.95, 0.48, 0.52, 1.0,
        0.82, 0.30, 0.38, 1.0,

        // Mund
        0.38, 0.22, 0.16, 1.0,
        0.38, 0.22, 0.16, 1.0,
        0.38, 0.22, 0.16, 1.0,

        // Schnurrhaare
        0.38, 0.22, 0.16, 1.0,
        0.38, 0.22, 0.16, 1.0,
        0.38, 0.22, 0.16, 1.0,

        0.38, 0.22, 0.16, 1.0,
        0.38, 0.22, 0.16, 1.0,
        0.38, 0.22, 0.16, 1.0,

        0.38, 0.22, 0.16, 1.0,
        0.38, 0.22, 0.16, 1.0,
        0.38, 0.22, 0.16, 1.0,

        0.38, 0.22, 0.16, 1.0,
        0.38, 0.22, 0.16, 1.0,
        0.38, 0.22, 0.16, 1.0,

        0.38, 0.22, 0.16, 1.0,
        0.38, 0.22, 0.16, 1.0,
        0.38, 0.22, 0.16, 1.0,

        0.38, 0.22, 0.16, 1.0,
        0.38, 0.22, 0.16, 1.0,
        0.38, 0.22, 0.16, 1.0
    ]);

    // Indices: jeweils drei Werte bilden ein Dreieck
    const indices = new Uint16Array([
        // Kopf
        0, 1, 2,
        0, 2, 7,
        2, 3, 7,
        3, 7, 8,
        3, 8, 9,
        3, 9, 10,
        3, 10, 11,
        3, 4, 11,
        4, 6, 11,
        4, 5, 6,

        // Innere Ohren
        12, 13, 14,
        15, 16, 17,

        // Linkes Auge
        18, 19, 20,
        18, 20, 21,

        // Rechtes Auge
        22, 23, 24,
        22, 24, 25,

        // Nase
        28, 29, 30,

        // Mund
        30, 31, 33,
        30, 33, 32,

        // Schnurrhaare links
        34, 35, 36,
        37, 38, 39,
        40, 41, 42,

        // Schnurrhaare rechts
        43, 44, 45,
        46, 47, 48,
        49, 50, 51

    ]);

    // Vertex-Positionen an die Grafikkarte senden
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        vertices,
        gl.STATIC_DRAW
    );


    const positionLocation =
        gl.getAttribLocation(program, "aPosition");

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(
        positionLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
    );

    // Vertex-Farben an die Grafikkarte senden
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        colors,
        gl.STATIC_DRAW
    );

    const colorLocation =
        gl.getAttribLocation(program, "aColor");

    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(
        colorLocation,
        4,
        gl.FLOAT,
        false,
        0,
        0
    );

    // Index-Buffer erstellen
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        indices,
        gl.STATIC_DRAW
    );

    // Zeichenfläche vorbereiten
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(23 / 255, 33 / 255, 43 / 255, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Katze aus gefüllten Dreiecken zeichnen
    gl.drawElements(
        gl.TRIANGLES,
        indices.length,
        gl.UNSIGNED_SHORT,
        0
    );

    // Anzahl der Vertices anzeigen
    status.textContent = "WebGL erfolgreich initialisiert.";

    vertexCountDisplay.textContent =
        "Anzahl der Vertices: " + (vertices.length / 2);
        } 
        
    catch (error) {
    status.textContent = "Fehler beim Zeichnen der Katze.";
    console.error(error);
}

    //Ende Aufgabe 3

    /* Ehemals Aufgabe 2

    const positionLocation =
        gl.getAttribLocation(program, "aPosition");

    const colorLocation =
        gl.getUniformLocation(program, "uColor");

    // KATZE: äußere Kontur und geometrische Gesichtsformen
    const outline = [
        // Linkes Ohr
        -0.62, 0.78,  -0.57, 0.25,
        -0.62, 0.78,  -0.22, 0.52,
        -0.57, 0.25,  -0.43, 0.02,

        // Rechtes Ohr
         0.62, 0.78,   0.57, 0.25,
         0.62, 0.78,   0.22, 0.52,
         0.57, 0.25,   0.43, 0.02,

        // Kopf
        -0.57, 0.25,  -0.62, 0.02,
        -0.62, 0.02,  -0.48, -0.30,
        -0.48, -0.30, -0.25, -0.48,
        -0.25, -0.48,  0.00, -0.58,
         0.00, -0.58,  0.25, -0.48,
         0.25, -0.48,  0.48, -0.30,
         0.48, -0.30,  0.62, 0.02,
         0.62, 0.02,   0.57, 0.25,

        // Innere Ohren
        -0.55, 0.65,  -0.48, 0.35,
        -0.55, 0.65,  -0.32, 0.53,
        -0.48, 0.35,  -0.32, 0.53,

         0.55, 0.65,   0.48, 0.35,
         0.55, 0.65,   0.32, 0.53,
         0.48, 0.35,   0.32, 0.53,

        // Stirn
        -0.22, 0.52,   0.00, 0.18,
         0.00, 0.18,   0.22, 0.52,
        -0.22, 0.52,   0.00, 0.42,
         0.00, 0.42,   0.22, 0.52,

        // Wangen
        -0.43, 0.02,  -0.18, -0.18,
        -0.18, -0.18, -0.08, -0.34,
         0.43, 0.02,   0.18, -0.18,
         0.18, -0.18,  0.08, -0.34,

        // Untere Gesichtskontur
        -0.48, -0.30, -0.22, -0.34,
        -0.22, -0.34,  0.00, -0.43,
         0.00, -0.43,  0.22, -0.34,
         0.22, -0.34,  0.48, -0.30
    ];

    const details = [
        // Linkes Auge
        -0.46, 0.05,  -0.32, 0.16,
        -0.32, 0.16,  -0.18, 0.14,
        -0.18, 0.14,  -0.12, 0.04,
        -0.12, 0.04,  -0.25, -0.02,
        -0.25, -0.02, -0.40, 0.00,
        -0.40, 0.00,  -0.46, 0.05,

        // Rechtes Auge
         0.46, 0.05,   0.32, 0.16,
         0.32, 0.16,   0.18, 0.14,
         0.18, 0.14,   0.12, 0.04,
         0.12, 0.04,   0.25, -0.02,
         0.25, -0.02,  0.40, 0.00,
         0.40, 0.00,   0.46, 0.05,

        // Pupillen
        -0.29, -0.015, -0.29, 0.12,
         0.29, -0.015,  0.29, 0.12,

        // Nase
        -0.07, -0.19,  0.07, -0.19,
        -0.07, -0.19,  0.00, -0.26,
         0.07, -0.19,  0.00, -0.26,

        // Mund
         0.00, -0.26,  0.00, -0.33,
         0.00, -0.33, -0.09, -0.37,
        -0.09, -0.37, -0.16, -0.33,
         0.00, -0.33,  0.09, -0.37,
         0.09, -0.37,  0.16, -0.33,

        // Schnurrhaare links
        -0.30, -0.18, -0.78, -0.12,
        -0.32, -0.24, -0.82, -0.25,
        -0.28, -0.29, -0.70, -0.40,

        // Schnurrhaare rechts
         0.30, -0.18,  0.78, -0.12,
         0.32, -0.24,  0.82, -0.25,
         0.28, -0.29,  0.70, -0.40,

        // Felllinien an den Wangen
        -0.45, -0.10, -0.35, -0.15,
        -0.43, -0.17, -0.34, -0.21,
         0.45, -0.10,  0.35, -0.15,
         0.43, -0.17,  0.34, -0.21,

        // Augenbrauen
        -0.44, 0.22,  -0.25, 0.25,
         0.44, 0.22,   0.25, 0.25
    ];

    const accents = [
        // Stirn und Nasenrücken
         0.00, 0.38,  0.00, 0.08,
        -0.04, 0.06,  0.00, 0.00,
         0.04, 0.06,  0.00, 0.00,

        // Dreiecke am Kopf
        -0.52, -0.02, -0.40, -0.12,
        -0.40, -0.12, -0.30, -0.08,
         0.52, -0.02,  0.40, -0.12,
         0.40, -0.12,  0.30, -0.08,

        // Linien unter dem Kinn
        -0.16, -0.47, -0.08, -0.52,
        -0.08, -0.52,  0.00, -0.54,
         0.00, -0.54,  0.08, -0.52,
         0.08, -0.52,  0.16, -0.47
    ];

    // Eine Liniengruppe mit eigener Farbe zeichnen
    function drawLines(vertices, color) {
        const buffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(vertices),
            gl.STATIC_DRAW
        );

        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(
            positionLocation,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );

        gl.uniform4f(
            colorLocation,
            color[0],
            color[1],
            color[2],
            1.0
        );

        gl.drawArrays(gl.LINES, 0, vertices.length / 2);

        gl.deleteBuffer(buffer);
    }

    // Zeichenfläche vorbereiten
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(23 / 255, 33 / 255, 43 / 255, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Katze in drei Farbschichten zeichnen
    drawLines(outline, [0.30, 0.95, 0.78]);  // Mintgrün
    drawLines(details, [0.95, 0.75, 0.55]);  // Warmes Creme
    drawLines(accents, [0.35, 0.72, 1.00]);  // Hellblau

    const totalVertices =
        outline.length / 2 +
        details.length / 2 +
        accents.length / 2;

    status.textContent = "WebGL erfolgreich initialisiert.";
    vertexCountDisplay.textContent =
        "Anzahl der Vertices: " + totalVertices;

} 
        catch (error) {
    status.textContent = "Fehler beim Zeichnen der Katze.";
    console.error(error);
}

*/
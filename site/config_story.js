local_save = JSON.parse(localStorage.boring_data);
story = {
    1: {
        cond: "Brink of extniction",
        desc: "There is no power left on earth. Humanity is on the brink of extinction.",
        task: "Use generator to manually generate a power",
        req_b: local_save["stats"]["total_pwr"],
        req_a: 100
    },
    2: {
        cond: "Brink of extniction",
        desc: "There is no power left on earth. Humanity is on the brink of extinction.",
        task: "Establish a biofuel plant",
        req_b: local_save["buildings"]["1_biof"],
        req_a: 3
    }
}
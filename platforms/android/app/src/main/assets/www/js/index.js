const token = "";
const baseUrl = "";
const bundleKey = "";
const language = "en";
const primaryColor = "#000000"; // Assuming a primary color

const testLiveness = true;


// Liveness specific parameters
const livenessParams = {
access_token: token,
base_url: baseUrl,
bundle_key: bundleKey,
language: language,
primary_color: primaryColor,
enable_smile: true,
enable_look_left: true,
enable_look_right: true,
enable_close_eyes: true,
livenss_number_of_failed_trials: "3",
livness_number_of_instructions: "4",
liveness_time_per_action: "10",
enable_voiceover: true,
show_error_message: true,
enable_logging: true
};
// Start process function refactored to only initialize relevant SDK based on condition
function startProcess() {
if (testLiveness){
        console.log("Starting Liveness Check");
        window.VIDVLivenessPlugin.startLiveness(livenessParams, null, null, function(result) {
            const s = result.toString();
            const jsonResult = JSON.parse(s);
            console.log("Liveness Success:", jsonResult);
            const state = jsonResult.nameValuePairs.state;
            switch (state) {
                case "SUCCESS":
                    console.log("Liveness was successful.");
                    // Add more logic here as necessary
                    break;
                case "CAPTURED_IMAGES":
                    console.log("Live captured images (one per time)");
                    // Add more logic here as necessary
                    break;
            }
        }, function(error) {
            const s = error.toString();
            const jsonResult = JSON.parse(s);
            console.error("Liveness Error:", jsonResult);
            const state = jsonResult.nameValuePairs.state;
            switch (state) {
                case "ERROR":
                    console.log("A Builder Error");
                    // Add more logic here as necessary
                    break;
                case "FAILURE":
                    console.log("A Service Failure");
                    // Add more logic here as necessary
                    break;
                case "EXIT":
                    console.log("Process was exited by the user.");
                    // Add more logic here as necessary
                    break;
            }
        });
    }
}

document.getElementById("button").addEventListener("click", startProcess);

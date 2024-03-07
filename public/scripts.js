let state_select_box = document.getElementById('state')
let lg_select_box = document.getElementById('local_govt')
let pu_select_box = document.getElementById('poll_unit')
let msg_box = document.getElementById('message')
axios.defaults.baseURL = "/api/";

const fetchStates = async (container_box) => {
     const response = await axios.get("/states")

     if (response.data.type == "success") {
          container_box.innerHTML = `<option value='0'> Choose State </option>`

          if (response.data.states.length == 0) {
               msg_box.innerHTML = "No State found"
               return
          }

          response.data.states.forEach((single_state) => {
               container_box.innerHTML += `<option value='${single_state.state_id}'> ${single_state.state_name} </option>`
          })
     }
}

const getLocalGovt = async (state_id, container_box) => {
     const response = await axios.get(`/states/${state_id}/lgs`)

     if (response.data.type == "success") {
          document.getElementById(container_box).innerHTML = `<option value='0'> Choose Local Govt </option>`

          if (response.data.local_govts.length == 0) {
               msg_box.innerHTML = "No Local Government found"
               return
          }
          response.data.local_govts.forEach((single_lg) => {
               document.getElementById(container_box).innerHTML += `<option value='${single_lg.lga_id}'> ${single_lg.lga_name} </option>`
          })
     }
}

const getPollUnits = async () => {
     const response = await axios.get(`/poll_units?lga=${lg_select_box.value}`)

     if (response.data.type == "success") {
          pu_select_box.innerHTML = `<option value='0'> Choose Poll Unit </option>`

          if (response.data.poll_units.length == 0) {
               msg_box.innerHTML = "No Polling Unit found"
               return
          }
          response.data.poll_units.forEach((single_pu) => {
               pu_select_box.innerHTML += `<option value='${single_pu.id}'> ${single_pu.name} </option>`
          })
     }
}

try {
     fetchStates(state_select_box)
} catch (err) {
     console.log(err)
}


const fetchElectionResult = async (pu_value, lga_value, org) => {
     const response = await axios.get(`/getElectionResult?${org}=${pu_value ? pu_value : lga_value}`)

     if (response.data.type == "success") {
          return response.data.poll_results
     }
}


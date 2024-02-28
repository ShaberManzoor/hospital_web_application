const formatTime = time => {
    // Split the time string into hours and minutes
    const [hours, minutes] = time.split(':');
  
    // Convert hours to 12-hour format
    let formattedHours = parseInt(hours, 10);
    const amPmIndicator = formattedHours >= 12 ? 'PM' : 'AM';
    formattedHours = formattedHours % 12 || 12; // Convert 0 to 12 for 12 AM
  
    // Construct the formatted time string
    const formattedTime = `${formattedHours}:${minutes} ${amPmIndicator}`;
  
    return formattedTime;
}

export default formatTime;
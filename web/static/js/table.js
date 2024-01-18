function changePage(num) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('page')) {
      console.log("yes")
      urlParams.set('page', num);
      const newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
      window.location.href = newUrl;
    }else{
      urlParams.append('page', num);
      const newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
      window.location.href = newUrl;
      console.log("no")
    }
    console.log("hhh")
}
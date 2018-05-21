/* eslint-disable */
const XLSX = require('xlsx')

const parseXLSX = (file) => {
  const workbook = XLSX.readFile(file)
  const cells = workbook.Sheets.Sheet0
  
  let combined = []
  let firstNameCol
  let lastNameCol

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // combine the rows values
  Object.keys(cells).forEach(cell => {
    let row = cell.slice(1)
    let col = cell.charAt(0)
    let val = cells[cell].v

    if (val === undefined) return

    // we need to determine which cols are for names.
    if (val === 'First Name') {
      firstNameCol = col
    }
    else if(val === 'Last Name') {
      lastNameCol = col
    }

    // cleanup + format
    val = val.trim()
    val = capitalizeFirstLetter(val)

    if (col === firstNameCol) {
      combined[row] += '-' + val + ' '
    }
    else if (col === lastNameCol) {
      combined[row] += val
    }
    else {
      // add punctuation if there isn't any.
      const hasPuncutation = /[,.?\-]/.test(val.charAt(val.length - 1))
      if (!hasPuncutation ) {
        val = val + '.'
      }
      combined[row] += val + ' '
    }
  })

  // turn into array
  const combinedArr = Object.keys(combined).map(key => { return combined[key] })

  // format testimonials HTML
  const formattedTestimonials = combinedArr.map((testimonial, i) => {
    // the first row is the list of questions.
    // we don't need this.
    if (i === 0) return

    // for some reason, each line started with 'undefined'
    // so we'll just slice that out real quick.
    testimonial = testimonial.slice(9)

    // remove blank testimonials
    if (testimonial.charAt(0) === '-') return

    var text = testimonial.split("-")[0].trim()
    var author = testimonial.split("-")[1].trim()

    return `<blockquote>"${text}" -${author}</blockquote>\n`
  })
  .join('\n')

  return formattedTestimonials
}

const generateTestimonialsShortcodes = (path) => {
  return parseXLSX(path)
}

export default generateTestimonialsShortcodes

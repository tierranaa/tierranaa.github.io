let keyframes = [
    {
        activeVerse: 1,
        activeLines: [1]
        
    },
    {
        activeVerse: 1,
        activeLines: [2]  
    },
    {
        activeVerse: 1,
        activeLines: [3]  
    },
    {
        activeVerse: 1,
        activeLines: [4]  
    },
    {
        activeVerse: 1,
        activeLines: [5]  
    },
    {
        activeVerse: 1,
        activeLines: [6]  
    },
    {
        activeVerse: 1,
        activeLines: [7]  
    },
    {
        activeVerse: 1,
        activeLines: [8]  
    },
    {
        activeVerse: 1,
        activeLines: [9]  
    },
    {
        activeVerse: 1,
        activeLines: [10]  
    },
    {
        activeVerse: 1,
        activeLines: [11]  
    },
    {
        activeVerse: 1,
        activeLines: [12]  
    },
    {
        activeVerse: 2,
        activeLines: [1]
        
    },
    {
        activeVerse: 2,
        activeLines: [2]  
    },
    {
        activeVerse: 2,
        activeLines: [3]  
    },
    {
        activeVerse: 2,
        activeLines: [4]  
    },
    {
        activeVerse: 2,
        activeLines: [5]  
    },
    {
        activeVerse: 2,
        activeLines: [6]  
    },
    {
        activeVerse: 2,
        activeLines: [7]  
    },
    {
        activeVerse: 2,
        activeLines: [8]  
    },
    {
        activeVerse: 2,
        activeLines: [9]  
    },
    {
        activeVerse: 2,
        activeLines: [10]  
    },
    {
        activeVerse: 2,
        activeLines: [11]  
    },
    {
        activeVerse: 3,
        activeLines: [1]
        
    },
    {
        activeVerse: 3,
        activeLines: [2]  
    },
    {
        activeVerse: 3,
        activeLines: [3]  
    },
    {
        activeVerse: 3,
        activeLines: [4]  
    },
    {
        activeVerse: 3,
        activeLines: [5]  
    },
    {
        activeVerse: 3,
        activeLines: [6]  
    },
    {
        activeVerse: 3,
        activeLines: [7]  
    },
    {
        activeVerse: 3,
        activeLines: [8]  
    },
    {
        activeVerse: 3,
        activeLines: [9]  
    },
    {
        activeVerse: 3,
        activeLines: [10]  
    },
    {
        activeVerse: 3,
        activeLines: [11]  
    }
]
function main(){
    var data = [66, 25, 9, 0];
    var customLabels = [
        'Brown: % of Black Women who changed their hair for a job interview',
        'Orange: % of Black Women who believed they were denied a job interview because of their hair',
        'Gray: estimated % of Black Women who have not experienced\nhair discrimination in the workplace'
      ];
      
    var svg = d3.select("svg"),
    width = +svg.attr('width'),
    height = +svg.attr('height'),
    radius = Math.min(width, height)/2
    var g = svg.append('g').attr('transform', 'translate(' + width / 4.5 + ',' + height / 2 + ')');
    var color = d3.scaleOrdinal(['rgba(100, 35, 35, 0.937)', 'rgba(241, 76, 0, 0.937)', 'rgb(179, 174, 174)', 'rgb(179, 174, 174)'])
    var pie = d3.pie();
    var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);
   
            
    var arcs = g.selectAll('arc')
               .data(pie(data))
               .enter().append('g')
               .attr('class','arc')
    arcs.append('path')
            .attr('fill', function(d, i){
                return color(i) 
            })
            .attr('d', arc);
    arcs.append('text')
        .attr('transform', function (d) {
            var pos = arc.centroid(d);
            pos[0] = radius * 1.1; // Adjust the horizontal position
            return 'translate(' + pos + ')';
        })
        .attr('dy', '0.35em') // Adjust the vertical position of the label
            .attr('text-anchor', 'start') // Align text to the left of the position
            .text(function (d, i) {
                return customLabels[i];
        });
}
let keyframeIndex = 0;

document.getElementById("forward-button").addEventListener("click", forwardClicked);
document.getElementById("backward-button").addEventListener("click", backwardClicked);

function forwardClicked() {
    if (keyframeIndex < keyframes.length - 1) {
        keyframeIndex++;
        drawKeyframe(keyframeIndex);
    }
}

function backwardClicked() {
    if (keyframeIndex > 0) {
        keyframeIndex--;
        drawKeyframe(keyframeIndex);
    }
}

function drawKeyframe(kfi) {
    let kf = keyframes[kfi];
    resetActiveLines();
    updateActiveVerse(kf.activeVerse);
    for (line of kf.activeLines) {
        updateActiveLine(kf.activeVerse, line);
    }
    if (kf.svgUpdate) {
        kf.svgUpdate();
    }
}

function resetActiveLines() {
    d3.selectAll(".line").classed("active-line", false);
}

function updateActiveLine(vid, lid) {
    let thisVerse = d3.select("#verse" + vid);
    thisVerse.select("#line" + lid).classed("active-line", true);
}

function scrollLeftColumnToActiveVerse(id) {
    var leftColumn = document.querySelector(".left-column-content");
    var activeVerse = document.getElementById("verse" + id);
    var verseRect = activeVerse.getBoundingClientRect();
    var leftColumnRect = leftColumn.getBoundingClientRect();
    var desiredScrollTop = verseRect.top + leftColumn.scrollTop - leftColumnRect.top - (leftColumnRect.height - verseRect.height) / 2;
    leftColumn.scrollTo({
        top: desiredScrollTop,
        behavior: 'smooth'
    });
}

function updateActiveVerse(id) {
    d3.selectAll(".verse").classed("active-verse", false);
    d3.select("#verse" + id).classed("active-verse", true);
    scrollLeftColumnToActiveVerse(id);
}

async function initialise() {
    drawKeyframe(keyframeIndex);
}

initialise();

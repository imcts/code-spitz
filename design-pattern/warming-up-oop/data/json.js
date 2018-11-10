const fetchJSON = (fileName) => new Promise((res, rej) => res({
    'title': 'TIOBE Index for June 2017',
    'header': ['Jun-17','Jun-16','Change','Programming Language','Ratings','Change'],
    'items': [
      [1,1,'','Java','14.49%','-6.30%'],
      [2,2,'','C','6.85%','-5.53%'],
      [3,3,'','C++','5.72%','-0.48%'],
      [4,4,'','Python','4.33%','0.43%'],
      [5,5,'','C#','3.53%','-0.26%'],
      [6,9,'change','Visual Basic .NET','3.11%','0.76%'],
      [7,7,'','JavaScript','3.03%','0.44%'],
      [8,6,'change','PHP','2.77%','-0.45%'],
      [9,8,'change','Perl','2.31%','-0.09%'],
      [10,12,'change','Assembly language','2.25%','0.13%'],
      [11,10,'change','Ruby','2.22%','-0.11%'],
      [12,14,'change','Swift','2.21%','0.38%'],
      [13,13,'','Delphi/Object Pascal','2.16%','0.22%'],
      [14,16,'change','R','2.15%','0.61%'],
      [15,48,'change','Go','2.04%','1.83%'],
      [16,11,'change','Visual Basic,2.01%','-0.24%'],
      [17,17,'','MATLAB','2.00%','0.55%'],
      [18,15,'change','Objective-C','1.96%','0.25%'],
      [19,22,'change','Scratch','1.71%','0.76%'],
      [20,18,'change','PL/SQL','1.57%','0.22%']
    ]
  })
)

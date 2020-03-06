# Verve

<div align="center">
<img src="https://img.shields.io/github/license/JigyasuPrakash/verve">	
<img src="https://www.codefactor.io/repository/github/JigyasuPrakash/verve/badge/master"/>
<img src="https://img.shields.io/github/stars/JigyasuPrakash/verve">
<img src="https://img.shields.io/github/forks/JigyasuPrakash/verveI">
<img src="https://img.shields.io/github/issues/JigyasuPrakash/verve">
<img src="https://img.shields.io/badge/PRs-welcome-informational">
</div>

## Midpoint Subdivision

Midpoint subdivision algorithm is an extension of the Cyrus Beck algorithm.

This algorithm is mainly used to compute visible areas of lines that are present in the view port are of the sector or the image.

It follows the principle of the bisection method and works similarly to the Cyrus Beck algorithm by bisecting the line in to equal halves. 

But unlike the Cyrus Beck algorithm, which only bisects the line once, Midpoint Subdivision Algorithm bisects the line numerous times.

Also the Sutherland Cohen subdivision line clipping algorithm requires the calculation of the intersection of the line with the window edge. These calculations can be avoided by repetitively subdividing the line at its midpoint.

The strength of this algorithm over the Cohen-Sutherland algorithm is that it requires no floating point arithmetic to find the point of intersection with the line and the clip boundary. The midpoint subdivision algorithm clips a line by finding the endpoints of the visible portion of the line segment. Each endpoint can be found by an identical process and given appropriate hardware, this can be done in parallel for both endpoints. 

Like other algorithm, initially the line is tested for visibility. If line is completely visible it is drawn and if it is completely invisible it is rejected. If line is partially visible then it is subdivided in two equal parts. The visibility tests are then applied to each half. This subdivision process is repeated until we get completely visible and completely invisible line segments. This is illustrated in figure (k) below
  
As shown in the figure (k), line P1 P2 is partially visible. It is subdivided in two equal Parts P1 P3 and P3 P2 (see Fig. k (b)). Both the line segments are tested for visibility and found to be partially visible. Both line segments are then subdivided in two equal parts to get midpoints P4 and P5 (see Fig. k (c)). It is observed that line segments P1 P4 and P5 P2 are completely invisible and hence rejected. However, line segment P3 P5 is completely visible and hence drawn. The remaining line segment P4 P3 is still partially visible. It is then subdivided to get midpoint P6. It is observed that P6 P3 is completely visible whereas P4 P6 is partially visible. Thus P6 P3 line segment is drawn and P4 P6 line segment is further subdivided into equal parts to get midpoint P7. Now, it is observed that line segment P4 P7 is completely invisible and line segment P7 P6 is completely visible (see Fig. k (f)), and there is no further partially visible segment.

Midpoint Subdivision Algorithm

  1. Read two endpoints of the line say P1(x1, y1) and P2(x2, y2).
  2. Read two corners left-top and right-bottom) of the window, say (Wx1, Wy1, and
     Wx2,Wy2).
  3. Assign region codes for 11111 *S mbg following steps :
     Initialise code with bits 0000
     Set Bit 1 - if (x < Wx1) 
     Set Bit 2 - If (x > Wx2) 
     Set Bit 3 - if (y < Wy1) 
     Set Bit 4 - if (y > Wy2)

  4. Check for visibility of line
     a) If region codes for both endpoints are zero then the line is completely 
       visible. Hence draw the line and go to step 6.
     b) If region codes for endpoints are not zero and the logical ANDing of them 
       is also nonzero then the line is completely invisible, so reject the line
       and go to step 6.
     c) If region codes for two endpoints do not satisfy the conditions in 4a) and 
       4b) the line is partially visible.
  5. Divide the partially visible line segment in equal parts and repeat steps 3 
     through 5 for both subdivided line segments until you get completely visible 
     and completely invisible line segments.
  6. Stop.

























Cohen-Sutherland algorithm divides a two-dimensional space into 9 regions and then efficiently determines the lines and portions of lines that are inside the given rectangular area.
The algorithm can be outlines as follows:-



Nine regions are created, eight "outside" regions and one 
"inside" region.

For a given line extreme point (x, y), we can quickly
find its region's four bit code. Four bit code can 
be computed by comparing x and y with four values 
(x_min, x_max, y_min and y_max).

If x is less than x_min then bit number 1 is set.
If x is greater than x_max then bit number 2 is set.
If y is less than y_min then bit number 3 is set.
If y is greater than y_max then bit number 4 is set

 
 
There are three possible cases for any given line.
1.	Completely inside the given rectangle : Bitwise OR of region of two end points of line is 0 (Both points are inside the rectangle)
2.	Completely outside the given rectangle : Both endpoints share at least one outside region which implies that the line does not cross the visible region. (bitwise AND of endpoints != 0).
3.	Partially inside the window : Both endpoints are in different regions. In this case, the algorithm finds one of the two points that is outside the rectangular region. The intersection of the line from outside point and rectangular window becomes new corner point and the algorithm repeats
 
### Pseudo Code:


Step 1 : Assign a region code for two endpoints of given line.


Step 2 : If both endpoints have a region code 0000 then given line is completely inside.


Step 3 : Else, perform the logical AND operation for both region codes.

        Step 3.1 : If the result is not 0000, then given line is completely outside.

Step 3.2 : Else line is partially inside.
        Step 3.2.1 : Choose an endpoint of the line 
                     that is outside the given rectangle.
        Step 3.2.2 : Find the intersection point of the 
                     rectangular boundary (based on region code).
        Step 3.2.3 : Replace endpoint with the intersection point 
                     and update the region code.
        Step 3.2.4 : Repeat step 2 until we find a clipped line either 
                     trivially accepted or trivially rejected.
Step 4 : Repeat step 1 for other lines







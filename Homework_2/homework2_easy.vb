
Sub homework2_easy()
    ' Since there are multiple worksheets, I want the data to apply to every worksheet when I run the program
    For Each Worksheet In Worksheets
    ' I inserted and adjusted the fonts/alignment of the titles
        Worksheet.Range("I1").Value = "Ticker"
        Worksheet.Range("I1").Font.Bold = True
        Worksheet.Columns("I").HorizontalAlignment = xlLeft
        Worksheet.Range("I1").HorizontalAlignment = xlCenter
        Worksheet.Range("J1").Value = "Total Stock Volume"
        Worksheet.Range("J1").Font.Bold = True
        Worksheet.Range("J1").HorizontalAlignment = xlCenter
        Worksheet.Columns("J").ColumnWidth = 17
        
        Dim last_row_of_year As Long
        Dim i As Long
        Dim ticker As Integer
        Dim stock_volume As Double
        ticker = 2
        stock_volume = 0
        ' Every worksheet has a different number of rows, so instead of setting up a loop where I is defined as an integer, I chose to select the entire column
        last_row_of_year = Worksheet.Cells(Rows.Count, "A").End(xlUp).Row
        ' Logic is to add the volume as long as the ticker is same as in the previous row
        For i = 2 To last_row_of_year
            If Worksheet.Cells(i + 1, 1).Value <> Worksheet.Cells(i, 1).Value Then
            ' When ticker is not equal to previous row
                Worksheet.Range("I" & ticker).Value = Worksheet.Range("A" & i).Value
                stock_volume = stock_volume + Worksheet.Range("G" & i).Value
                Worksheet.Range("J" & ticker).Value = stock_volume
                ticker = ticker + 1
                stock_volume = 0
            Else
            ' When ticker is equal to previous row
                stock_volume = stock_volume + Worksheet.Range("G" & i).Value
            End If
        Next i
        
    Next Worksheet

End Sub

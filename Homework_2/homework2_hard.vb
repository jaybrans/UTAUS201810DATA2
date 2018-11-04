
Sub homework2_hard_w_challenge()
    ' Since there are multiple worksheets, I want the data to apply to every worksheet when I run the program
    For Each Worksheet In Worksheets
     ' I inserted and adjusted the fonts/alignment of the titles
        Worksheet.Range("I1").Value = "Ticker"
        Worksheet.Range("I1").Font.Bold = True
        Worksheet.Range("I1").HorizontalAlignment = xlCenter
        Worksheet.Range("J1").Value = "Yearly Change"
        Worksheet.Range("J1").Font.Bold = True
        Worksheet.Range("J1").HorizontalAlignment = xlCenter
        Worksheet.Range("K1").Value = "Percent Change"
        Worksheet.Range("K1").Font.Bold = True
        Worksheet.Range("K1").HorizontalAlignment = xlCenter
        Worksheet.Range("L1").Value = "Total Stock Volume"
        Worksheet.Range("L1").Font.Bold = True
        Worksheet.Range("L1").HorizontalAlignment = xlCenter
        Worksheet.Columns("J:L").ColumnWidth = 17
        ' Column J is representative of Yearly Change, which is represented with a decimal number format; column K is representative of the Percent Change, so the numbers should reflect that as well
        Worksheet.Columns("J").NumberFormat = "0.00"
        Worksheet.Columns("K").NumberFormat = "0.00%"
        
        Dim i As Long
        Dim ticker As Integer
        Dim last_row_of_year As Long
        Dim opening_price As Double
        Dim closing_price As Double
        Dim stock_volume As Double
        Dim stock_start As Long
        Dim percent_change As Double
        ticker = 2
        ' next_stock_row is used to mark the next ticker. For example, stock A and then the next stock row following will be AA
        next_stock_row = 2
        stock_volume = 0
        last_row_of_year = Worksheet.Cells(Rows.Count, "A").End(xlUp).Row
        
        For i = 2 To last_row_of_year
        ' iterating through all the rows
            If Worksheet.Cells(i + 1, 1).Value <> Worksheet.Cells(i, 1).Value Then
            ' when ticker is not same as in previous row
                Worksheet.Range("I" & ticker).Value = Worksheet.Range("A" & i).Value
                ' opening price of ticket for a day
                opening_price = Worksheet.Cells(next_stock_row, 3).Value
                next_stock_row = i + 1
                ' calculating stock volume
                stock_volume = stock_volume + Worksheet.Range("G" & i).Value
                Worksheet.Range("L" & ticker).Value = stock_volume
                closing_price = Worksheet.Cells(i, 6).Value
                Worksheet.Range("J" & ticker).Value = (closing_price - opening_price)
                If opening_price = 0 Then
                    Worksheet.Range("K" & ticker).Value = 0
                Else
                    Worksheet.Range("K" & ticker).Value = ((closing_price - opening_price) / opening_price)
                End If
               ticker = ticker + 1
                stock_volume = 0
            Else
            ' This else is setup for the situations in which the ticker is the same value
               stock_volume = stock_volume + Worksheet.Range("G" & i).Value

            End If
        
        Next i

        Dim positive_or_negative_yearly_change As Double
        positive_or_negative_yearly_change = Worksheet.Cells(Rows.Count, "J").End(xlUp).Row
        For i = 2 To positive_or_negative_yearly_change
            If Worksheet.Range("J" & i).Value > 0 Then
                Worksheet.Range("J" & i).Interior.ColorIndex = 4
            ElseIf Worksheet.Range("J" & i).Value < 0 Then
                Worksheet.Range("J" & i).Interior.ColorIndex = 3
            End If
             
        Next i
        
        Dim greatest_percent_increase As Double
        Dim greatest_percent_decrease As Double
        Dim greatest_total_volume As Variant
        Dim row_index1 As Double
        Dim row_index2 As Double
        Dim row_index3 As Variant
        
     Worksheet.Range("O2").Value = "Greatest % Increase"
     Worksheet.Range("O2").Font.Bold = True
     Worksheet.Range("O3").Value = "Greatest % Decrease"
        Worksheet.Range("O3").Font.Bold = True
        Worksheet.Range("O4").Value = "Greatest Total Volume"
        Worksheet.Range("O4").Font.Bold = True
        Worksheet.Columns("O").HorizontalAlignment = xlCenter
        Worksheet.Columns("O").ColumnWidth = 20
        Worksheet.Range("P1").Value = "Ticker"
        Worksheet.Range("P1").Font.Bold = True
        Worksheet.Range("P1").HorizontalAlignment = xlCenter
        Worksheet.Range("Q1").Value = "Value"
        Worksheet.Range("Q1").Font.Bold = True
        Worksheet.Range("Q1").HorizontalAlignment = xlCenter
        Worksheet.Range("Q2:Q3").NumberFormat = "0.00%"
        Worksheet.Columns("Q").ColumnWidth = 17
        
        greatest_percent_increase = Application.WorksheetFunction.Max(Worksheet.Columns("K"))
        Worksheet.Cells(2, 17).Value = greatest_percent_increase
        row_index1 = Application.Match(greatest_percent_increase, Worksheet.Range("K:K"), 0)
        Worksheet.Cells(2, 16).Value = Worksheet.Cells(row_index1, 9)
        
        greatest_percent_decrease = Application.WorksheetFunction.Min(Worksheet.Columns("K"))
        Worksheet.Cells(3, 17).Value = greatest_percent_decrease
        row_index2 = Application.Match(greatest_percent_decrease, Worksheet.Range("K:K"), 0)
        Worksheet.Cells(3, 16).Value = Worksheet.Cells(row_index2, 9)
        
        greatest_total_volume = Application.WorksheetFunction.Max(Worksheet.Columns("L"))
        Worksheet.Cells(4, 17).Value = greatest_total_volume
        row_index3 = Application.Match(greatest_total_volume, Worksheet.Range("L:L"), 0)
        Worksheet.Cells(4, 16).Value = Worksheet.Cells(row_index3, 9)
    Next Worksheet
         
End Sub

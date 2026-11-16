Feature: File Upload

    Background:
        Given I open the file upload page

    Scenario: Upload a file and verify its filename
        When I upload the sample file
        Then the uploaded filename should be "upload.txt"
import { Component } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  selectedImage: File | null = null;
  imageUrl: String | null = null;
  constructor(private testService: TestService) {}

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  uploadImage() {
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('image', this.selectedImage, this.selectedImage.name);
      this.testService.uploadImage(formData).subscribe({
        next: (response) => {
        this.imageUrl = response;
        console.log("success submitting image");
      },
       error: (error)=> {
        console.error("Error submitting image" + error);
      }});
    }
  }
}

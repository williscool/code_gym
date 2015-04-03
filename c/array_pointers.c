#include <stdio.h>
#define NUM_ELEMENTS 5 // http://stackoverflow.com/a/13645995/511710

// http://en.wikipedia.org/wiki/C_%28programming_language%29#Array.E2.80.93pointer_interchangeability 

int i;

int arr[NUM_ELEMENTS];

char* arr_addr = arr;

int main()  {
  
  for ( i; i < NUM_ELEMENTS; i++) {
    
    arr[i] = i + 20;
    
    printf("arr[%d] val: %d \n", i , arr[i]);
    // http://boredzo.org/pointers/
    
    printf("*(arr + i): %d \n\n", *(arr_addr + i * sizeof(int)));
  }
  
  return 0;
}
